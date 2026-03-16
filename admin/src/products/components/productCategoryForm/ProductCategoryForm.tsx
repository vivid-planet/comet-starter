import { useApolloClient, useQuery } from "@apollo/client";
import { FieldSet, filterByFragment, FinalForm, type FinalFormSubmitEvent, Loading, TextField, useFormApiRef, useStackSwitchApi } from "@comet/admin";
import { queryUpdatedAt, resolveHasSaveConflict, useContentScope, useFormSaveConflict } from "@comet/cms-admin";
import { type GQLProductCategoryValidationErrorCode } from "@src/graphql.generated";
import { FORM_ERROR, type FormApi } from "final-form";
import isEqual from "lodash.isequal";
import { type ReactNode, useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { ProductCategoryAsyncAutocompleteField } from "../productCategoryAsyncAutocompleteField/ProductCategoryAsyncAutocompleteField";
import {
    createProductCategoryMutation,
    productCategoryFormFragment,
    productCategoryQuery,
    updateProductCategoryMutation,
} from "./ProductCategoryForm.gql";
import {
    type GQLCreateProductCategoryMutation,
    type GQLCreateProductCategoryMutationVariables,
    type GQLProductCategoryFormDetailsFragment,
    type GQLProductCategoryQuery,
    type GQLProductCategoryQueryVariables,
    type GQLUpdateProductCategoryMutation,
    type GQLUpdateProductCategoryMutationVariables,
} from "./ProductCategoryForm.gql.generated";

type FormValues = GQLProductCategoryFormDetailsFragment;

interface FormProps {
    id?: string;
}

const submissionErrorMessages: Record<GQLProductCategoryValidationErrorCode, ReactNode> = {
    SLUG_ALREADY_EXISTS: <FormattedMessage id="productCategory.error.slugAlreadyExists" defaultMessage="This slug is already in use" />,
};

export function ProductCategoryForm({ id }: FormProps) {
    const client = useApolloClient();
    const mode = id ? "edit" : "add";
    const formApiRef = useFormApiRef<FormValues>();
    const stackSwitchApi = useStackSwitchApi();
    const { scope } = useContentScope();

    const { data, error, loading, refetch } = useQuery<GQLProductCategoryQuery, GQLProductCategoryQueryVariables>(
        productCategoryQuery,
        id ? { variables: { id } } : { skip: true },
    );

    const initialValues = useMemo<Partial<FormValues>>(
        () =>
            data?.productCategory
                ? {
                      ...filterByFragment<FormValues>(productCategoryFormFragment, data.productCategory),
                  }
                : {},
        [data],
    );

    const saveConflict = useFormSaveConflict({
        checkConflict: async () => {
            const updatedAt = await queryUpdatedAt(client, "productCategory", id);
            return resolveHasSaveConflict(data?.productCategory.updatedAt, updatedAt);
        },
        formApiRef,
        loadLatestVersion: async () => {
            await refetch();
        },
    });

    const handleSubmit = async (formValues: FormValues, form: FormApi<FormValues>, event: FinalFormSubmitEvent) => {
        if (await saveConflict.checkForConflicts()) throw new Error("Conflicts detected");

        const output = {
            name: formValues.name,
            slug: formValues.slug,
            parentCategory: formValues.parentCategory ? formValues.parentCategory.id : null,
        };

        if (mode === "edit") {
            if (!id) throw new Error();
            const { data: mutationResponse } = await client.mutate<GQLUpdateProductCategoryMutation, GQLUpdateProductCategoryMutationVariables>({
                mutation: updateProductCategoryMutation,
                variables: { id, input: output },
            });

            if (mutationResponse?.updateProductCategory.errors.length) {
                return mutationResponse.updateProductCategory.errors.reduce(
                    (submissionErrors: Record<string, ReactNode>, error: { code: GQLProductCategoryValidationErrorCode; field?: string | null }) => {
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
            const { data: mutationResponse } = await client.mutate<GQLCreateProductCategoryMutation, GQLCreateProductCategoryMutationVariables>({
                mutation: createProductCategoryMutation,
                variables: { input: output, scope },
            });

            if (mutationResponse?.createProductCategory.errors.length) {
                return mutationResponse.createProductCategory.errors.reduce(
                    (submissionErrors: Record<string, ReactNode>, error: { code: GQLProductCategoryValidationErrorCode; field?: string | null }) => {
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

            const newId = mutationResponse?.createProductCategory.productCategory?.id;
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
                    <FieldSet initiallyExpanded title={<FormattedMessage id="productCategory.fieldSet.general" defaultMessage="General" />}>
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="name"
                            label={<FormattedMessage id="productCategory.name" defaultMessage="Name" />}
                        />
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="slug"
                            label={<FormattedMessage id="productCategory.slug" defaultMessage="Slug" />}
                            helperText={
                                <FormattedMessage
                                    id="productCategory.slug.helperText"
                                    defaultMessage="URL-friendly identifier, e.g. 'my-category'. Only lowercase letters, numbers, and hyphens."
                                />
                            }
                        />
                        <ProductCategoryAsyncAutocompleteField
                            name="parentCategory"
                            label={<FormattedMessage id="productCategory.parentCategory" defaultMessage="Parent Category" />}
                            excludeId={id}
                        />
                    </FieldSet>
                </>
            )}
        </FinalForm>
    );
}
