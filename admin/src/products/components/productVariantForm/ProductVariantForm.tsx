import { useApolloClient, useQuery } from "@apollo/client";
import {
    Field,
    FieldSet,
    filterByFragment,
    FinalForm,
    type FinalFormSubmitEvent,
    Loading,
    NumberField,
    SwitchField,
    TextField,
    useFormApiRef,
    useStackSwitchApi,
} from "@comet/admin";
import { type BlockState, createFinalFormBlock, DamImageBlock, queryUpdatedAt, resolveHasSaveConflict, useFormSaveConflict } from "@comet/cms-admin";
import { InputAdornment } from "@mui/material";
import { validateNonNegativeInteger } from "@src/common/validators/validateNonNegativeInteger";
import { validatePositiveNumber } from "@src/common/validators/validatePositiveNumber";
import { VariantStatusSelectField } from "@src/products/components/variantStatusSelectField/VariantStatusSelectField";
import { FORM_ERROR, type FormApi } from "final-form";
import isEqual from "lodash.isequal";
import { type ReactNode, useMemo } from "react";
import { FormattedMessage } from "react-intl";

import {
    createProductVariantMutation,
    productVariantFormFragment,
    productVariantQuery,
    updateProductVariantMutation,
} from "./ProductVariantForm.gql";
import {
    type GQLCreateProductVariantMutation,
    type GQLCreateProductVariantMutationVariables,
    type GQLProductVariantFormDetailsFragment,
    type GQLProductVariantQuery,
    type GQLProductVariantQueryVariables,
    type GQLUpdateProductVariantMutation,
    type GQLUpdateProductVariantMutationVariables,
} from "./ProductVariantForm.gql.generated";

const rootBlocks = {
    image: DamImageBlock,
};

type FormValues = GQLProductVariantFormDetailsFragment & {
    image: BlockState<typeof rootBlocks.image>;
};

interface FormProps {
    id?: string;
    productId?: string;
}

export function ProductVariantForm({ id, productId }: FormProps) {
    const client = useApolloClient();
    const mode = id ? "edit" : "add";
    const formApiRef = useFormApiRef<FormValues>();
    const stackSwitchApi = useStackSwitchApi();

    const { data, error, loading, refetch } = useQuery<GQLProductVariantQuery, GQLProductVariantQueryVariables>(
        productVariantQuery,
        id ? { variables: { id } } : { skip: true },
    );

    const initialValues = useMemo<Partial<FormValues>>(
        () =>
            data?.productVariant
                ? {
                      ...filterByFragment<GQLProductVariantFormDetailsFragment>(productVariantFormFragment, data.productVariant),
                      image: data.productVariant.image ? rootBlocks.image.input2State(data.productVariant.image) : rootBlocks.image.defaultValues(),
                  }
                : {
                      isAvailable: true,
                      stock: 0,
                      image: rootBlocks.image.defaultValues(),
                  },
        [data],
    );

    const saveConflict = useFormSaveConflict({
        checkConflict: async () => {
            const updatedAt = await queryUpdatedAt(client, "productVariant", id);
            return resolveHasSaveConflict(data?.productVariant.updatedAt, updatedAt);
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
            image: rootBlocks.image.state2Output(formValues.image),
        };

        if (mode === "edit") {
            if (!id) throw new Error();
            const { data: mutationResponse } = await client.mutate<GQLUpdateProductVariantMutation, GQLUpdateProductVariantMutationVariables>({
                mutation: updateProductVariantMutation,
                variables: { id, input: output },
            });

            if (mutationResponse?.updateProductVariant.errors.length) {
                return mutationResponse.updateProductVariant.errors.reduce(
                    (submissionErrors, error) => {
                        if (error.field) {
                            submissionErrors[error.field] = error.code;
                        } else {
                            submissionErrors[FORM_ERROR] = error.code;
                        }
                        return submissionErrors;
                    },
                    {} as Record<string, ReactNode>,
                );
            }
        } else {
            if (!productId) throw new Error("productId is required for creating a product variant");
            const { data: mutationResponse } = await client.mutate<GQLCreateProductVariantMutation, GQLCreateProductVariantMutationVariables>({
                mutation: createProductVariantMutation,
                variables: { product: productId, input: output },
            });

            if (mutationResponse?.createProductVariant.errors.length) {
                return mutationResponse.createProductVariant.errors.reduce(
                    (submissionErrors, error) => {
                        if (error.field) {
                            submissionErrors[error.field] = error.code;
                        } else {
                            submissionErrors[FORM_ERROR] = error.code;
                        }
                        return submissionErrors;
                    },
                    {} as Record<string, ReactNode>,
                );
            }

            const newId = mutationResponse?.createProductVariant.productVariant?.id;
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
                    <FieldSet initiallyExpanded title={<FormattedMessage id="productVariant.fieldSet.general" defaultMessage="General" />}>
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="name"
                            label={<FormattedMessage id="productVariant.name" defaultMessage="Name" />}
                        />
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="sku"
                            label={<FormattedMessage id="productVariant.sku" defaultMessage="SKU" />}
                        />
                        <VariantStatusSelectField
                            required
                            variant="horizontal"
                            fullWidth
                            name="variantStatus"
                            label={<FormattedMessage id="productVariant.variantStatus" defaultMessage="Status" />}
                        />
                    </FieldSet>
                    <FieldSet
                        initiallyExpanded
                        title={<FormattedMessage id="productVariant.fieldSet.pricingAndStock" defaultMessage="Pricing & Stock" />}
                    >
                        <NumberField
                            required
                            variant="horizontal"
                            fullWidth
                            name="price"
                            label={<FormattedMessage id="productVariant.price" defaultMessage="Price" />}
                            validate={validatePositiveNumber}
                            endAdornment={<InputAdornment position="end">&euro;</InputAdornment>}
                        />
                        <NumberField
                            required
                            variant="horizontal"
                            fullWidth
                            name="stock"
                            label={<FormattedMessage id="productVariant.stock" defaultMessage="Stock" />}
                            validate={validateNonNegativeInteger}
                        />
                        <SwitchField
                            name="isAvailable"
                            fieldLabel={<FormattedMessage id="productVariant.isAvailable" defaultMessage="Available" />}
                            variant="horizontal"
                            fullWidth
                        />
                    </FieldSet>
                    <FieldSet initiallyExpanded title={<FormattedMessage id="productVariant.fieldSet.media" defaultMessage="Media" />}>
                        <Field
                            name="image"
                            isEqual={isEqual}
                            label={<FormattedMessage id="productVariant.image" defaultMessage="Image" />}
                            variant="horizontal"
                            fullWidth
                        >
                            {createFinalFormBlock(rootBlocks.image)}
                        </Field>
                    </FieldSet>
                </>
            )}
        </FinalForm>
    );
}
