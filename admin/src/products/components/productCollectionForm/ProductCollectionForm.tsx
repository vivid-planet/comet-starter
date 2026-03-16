import { useApolloClient, useQuery } from "@apollo/client";
import {
    FieldSet,
    filterByFragment,
    FinalForm,
    type FinalFormSubmitEvent,
    Future_DateTimePickerField,
    Loading,
    SwitchField,
    TextAreaField,
    TextField,
    useFormApiRef,
    useStackSwitchApi,
} from "@comet/admin";
import { queryUpdatedAt, resolveHasSaveConflict, useContentScope, useFormSaveConflict } from "@comet/cms-admin";
import { validateSlug } from "@src/common/validators/validateSlug";
import { type GQLProductCollectionValidationErrorCode } from "@src/graphql.generated";
import { CollectionTypeSelectField } from "@src/products/components/collectionTypeSelectField/CollectionTypeSelectField";
import { FORM_ERROR, type FormApi } from "final-form";
import isEqual from "lodash.isequal";
import { type ReactNode, useMemo } from "react";
import { FormattedMessage } from "react-intl";

import {
    createProductCollectionMutation,
    productCollectionFormFragment,
    productCollectionQuery,
    updateProductCollectionMutation,
} from "./ProductCollectionForm.gql";
import {
    type GQLCreateProductCollectionMutation,
    type GQLCreateProductCollectionMutationVariables,
    type GQLProductCollectionFormDetailsFragment,
    type GQLProductCollectionFormQueryQuery,
    type GQLProductCollectionFormQueryQueryVariables,
    type GQLUpdateProductCollectionMutation,
    type GQLUpdateProductCollectionMutationVariables,
} from "./ProductCollectionForm.gql.generated";

type ProductCollectionFormDetailsFragment = Omit<GQLProductCollectionFormDetailsFragment, "validFrom" | "validTo"> & {
    validFrom?: Date | null;
    validTo?: Date | null;
};

type FormValues = ProductCollectionFormDetailsFragment;

const submissionErrorMessages: Record<GQLProductCollectionValidationErrorCode, ReactNode> = {
    SLUG_ALREADY_EXISTS: <FormattedMessage id="productCollection.validation.slugAlreadyExists" defaultMessage="This slug is already in use" />,
    VALID_TO_MUST_BE_AFTER_VALID_FROM: (
        <FormattedMessage id="productCollection.validation.validToMustBeAfterValidFrom" defaultMessage="Valid to must be after valid from" />
    ),
};

interface FormProps {
    id?: string;
}

export function ProductCollectionForm({ id }: FormProps) {
    const client = useApolloClient();
    const mode = id ? "edit" : "add";
    const formApiRef = useFormApiRef<FormValues>();
    const stackSwitchApi = useStackSwitchApi();
    const { scope } = useContentScope();

    const { data, error, loading, refetch } = useQuery<GQLProductCollectionFormQueryQuery, GQLProductCollectionFormQueryQueryVariables>(
        productCollectionQuery,
        id ? { variables: { id } } : { skip: true },
    );

    const initialValues = useMemo<Partial<FormValues>>(
        () =>
            data?.productCollection
                ? {
                      ...filterByFragment<GQLProductCollectionFormDetailsFragment>(productCollectionFormFragment, data.productCollection),
                      validFrom: data.productCollection.validFrom ? new Date(data.productCollection.validFrom) : undefined,
                      validTo: data.productCollection.validTo ? new Date(data.productCollection.validTo) : undefined,
                  }
                : {
                      isActive: false,
                  },
        [data],
    );

    const saveConflict = useFormSaveConflict({
        checkConflict: async () => {
            const updatedAt = await queryUpdatedAt(client, "productCollection", id);
            return resolveHasSaveConflict(data?.productCollection.updatedAt, updatedAt);
        },
        formApiRef,
        loadLatestVersion: async () => {
            await refetch();
        },
    });

    const handleSubmit = async (formValues: FormValues, form: FormApi<FormValues>, event: FinalFormSubmitEvent) => {
        if (await saveConflict.checkForConflicts()) throw new Error("Conflicts detected");

        const output = {
            ...formValues,
            validFrom: formValues.validFrom ? formValues.validFrom.toISOString() : null,
            validTo: formValues.validTo ? formValues.validTo.toISOString() : null,
        };

        if (mode === "edit") {
            if (!id) throw new Error();
            const { data: mutationResponse } = await client.mutate<GQLUpdateProductCollectionMutation, GQLUpdateProductCollectionMutationVariables>({
                mutation: updateProductCollectionMutation,
                variables: { id, input: output },
            });

            if (mutationResponse?.updateProductCollection.errors.length) {
                return mutationResponse.updateProductCollection.errors.reduce(
                    (submissionErrors, error) => {
                        const errorMessage = submissionErrorMessages[error.code];
                        if (error.field) {
                            submissionErrors[error.field] = errorMessage;
                        } else {
                            submissionErrors[FORM_ERROR] = errorMessage;
                        }
                        return submissionErrors;
                    },
                    {} as Record<string, ReactNode>,
                );
            }
        } else {
            const { data: mutationResponse } = await client.mutate<GQLCreateProductCollectionMutation, GQLCreateProductCollectionMutationVariables>({
                mutation: createProductCollectionMutation,
                variables: { scope, input: output },
            });

            if (mutationResponse?.createProductCollection.errors.length) {
                return mutationResponse.createProductCollection.errors.reduce(
                    (submissionErrors, error) => {
                        const errorMessage = submissionErrorMessages[error.code];
                        if (error.field) {
                            submissionErrors[error.field] = errorMessage;
                        } else {
                            submissionErrors[FORM_ERROR] = errorMessage;
                        }
                        return submissionErrors;
                    },
                    {} as Record<string, ReactNode>,
                );
            }

            const newId = mutationResponse?.createProductCollection.productCollection?.id;
            if (newId) {
                setTimeout(() => stackSwitchApi.activatePage("edit", newId));
            }
        }
    };

    if (error) throw error;
    if (loading) return <Loading behavior="fillPageHeight" />;

    return (
        <FinalForm<FormValues>
            apiRef={formApiRef}
            onSubmit={handleSubmit}
            mode={mode}
            initialValues={initialValues}
            initialValuesEqual={isEqual}
            subscription={{}}
        >
            {() => (
                <>
                    {saveConflict.dialogs}
                    <FieldSet initiallyExpanded title={<FormattedMessage id="productCollection.fieldSet.general" defaultMessage="General" />}>
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="name"
                            label={<FormattedMessage id="productCollection.name" defaultMessage="Name" />}
                        />
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="slug"
                            label={<FormattedMessage id="productCollection.slug" defaultMessage="Slug" />}
                            validate={validateSlug}
                            helperText={
                                <FormattedMessage
                                    id="productCollection.slug.helperText"
                                    defaultMessage="URL-friendly identifier. Only lowercase letters, numbers, and hyphens."
                                />
                            }
                        />
                        <TextAreaField
                            variant="horizontal"
                            fullWidth
                            name="description"
                            label={<FormattedMessage id="productCollection.description" defaultMessage="Description" />}
                        />
                    </FieldSet>
                    <FieldSet initiallyExpanded title={<FormattedMessage id="productCollection.fieldSet.settings" defaultMessage="Settings" />}>
                        <CollectionTypeSelectField
                            required
                            variant="horizontal"
                            fullWidth
                            name="collectionType"
                            label={<FormattedMessage id="productCollection.collectionType" defaultMessage="Collection Type" />}
                        />
                        <SwitchField
                            name="isActive"
                            fieldLabel={<FormattedMessage id="productCollection.isActive" defaultMessage="Active" />}
                            variant="horizontal"
                            fullWidth
                        />
                    </FieldSet>
                    <FieldSet initiallyExpanded title={<FormattedMessage id="productCollection.fieldSet.validity" defaultMessage="Validity" />}>
                        <Future_DateTimePickerField
                            variant="horizontal"
                            fullWidth
                            name="validFrom"
                            label={<FormattedMessage id="productCollection.validFrom" defaultMessage="Valid From" />}
                        />
                        <Future_DateTimePickerField
                            variant="horizontal"
                            fullWidth
                            name="validTo"
                            label={<FormattedMessage id="productCollection.validTo" defaultMessage="Valid To" />}
                        />
                    </FieldSet>
                </>
            )}
        </FinalForm>
    );
}
