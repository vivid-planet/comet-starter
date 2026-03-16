import { useApolloClient, useQuery } from "@apollo/client";
import {
    Field,
    FieldSet,
    filterByFragment,
    FinalForm,
    type FinalFormSubmitEvent,
    Future_DateTimePickerField,
    Loading,
    NumberField,
    SwitchField,
    TextAreaField,
    TextField,
    useFormApiRef,
    useStackSwitchApi,
} from "@comet/admin";
import {
    type BlockState,
    createFinalFormBlock,
    DamImageBlock,
    queryUpdatedAt,
    resolveHasSaveConflict,
    useContentScope,
    useFormSaveConflict,
} from "@comet/cms-admin";
import { InputAdornment } from "@mui/material";
import { validatePositiveNumber } from "@src/common/validators/validatePositiveNumber";
import { validateSkuFormat } from "@src/common/validators/validateSkuFormat";
import { validateSlug } from "@src/common/validators/validateSlug";
import { type GQLProductValidationErrorCode } from "@src/graphql.generated";
import { ProductStatusSelectField } from "@src/products/components/productStatusSelectField/ProductStatusSelectField";
import { ProductTypeSelectField } from "@src/products/components/productTypeSelectField/ProductTypeSelectField";
import { FORM_ERROR, type FormApi } from "final-form";
import isEqual from "lodash.isequal";
import { type ReactNode, useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { createProductMutation, productFormFragment, productQuery, updateProductMutation } from "./ProductForm.gql";
import {
    type GQLCreateProductMutation,
    type GQLCreateProductMutationVariables,
    type GQLProductFormDetailsFragment,
    type GQLProductQuery,
    type GQLProductQueryVariables,
    type GQLUpdateProductMutation,
    type GQLUpdateProductMutationVariables,
} from "./ProductForm.gql.generated";

const rootBlocks = {
    mainImage: DamImageBlock,
};

type ProductFormDetailsFragment = Omit<GQLProductFormDetailsFragment, "publishedAt"> & {
    publishedAt?: Date | null;
    mainImage: BlockState<typeof rootBlocks.mainImage>;
};

type FormValues = ProductFormDetailsFragment;

const submissionErrorMessages: Record<GQLProductValidationErrorCode, ReactNode> = {
    SLUG_ALREADY_EXISTS: <FormattedMessage id="product.validation.slugAlreadyExists" defaultMessage="This slug is already in use" />,
    SKU_ALREADY_EXISTS: <FormattedMessage id="product.validation.skuAlreadyExists" defaultMessage="This SKU is already in use" />,
};

interface FormProps {
    id?: string;
}

export function ProductForm({ id }: FormProps) {
    const client = useApolloClient();
    const mode = id ? "edit" : "add";
    const formApiRef = useFormApiRef<FormValues>();
    const stackSwitchApi = useStackSwitchApi();
    const { scope } = useContentScope();

    const { data, error, loading, refetch } = useQuery<GQLProductQuery, GQLProductQueryVariables>(
        productQuery,
        id ? { variables: { id } } : { skip: true },
    );

    const initialValues = useMemo<Partial<FormValues>>(
        () =>
            data?.product
                ? {
                      ...filterByFragment<GQLProductFormDetailsFragment>(productFormFragment, data.product),
                      publishedAt: data.product.publishedAt ? new Date(data.product.publishedAt) : undefined,
                      mainImage: data.product.mainImage
                          ? rootBlocks.mainImage.input2State(data.product.mainImage)
                          : rootBlocks.mainImage.defaultValues(),
                  }
                : {
                      isPublished: false,
                      mainImage: rootBlocks.mainImage.defaultValues(),
                  },
        [data],
    );

    const saveConflict = useFormSaveConflict({
        checkConflict: async () => {
            const updatedAt = await queryUpdatedAt(client, "product", id);
            return resolveHasSaveConflict(data?.product.updatedAt, updatedAt);
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
            publishedAt: formValues.publishedAt ? formValues.publishedAt.toISOString() : null,
            mainImage: rootBlocks.mainImage.state2Output(formValues.mainImage),
        };

        if (mode === "edit") {
            if (!id) throw new Error();
            const { data: mutationResponse } = await client.mutate<GQLUpdateProductMutation, GQLUpdateProductMutationVariables>({
                mutation: updateProductMutation,
                variables: { id, input: output },
            });

            if (mutationResponse?.updateProduct.errors.length) {
                return mutationResponse.updateProduct.errors.reduce(
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
            const { data: mutationResponse } = await client.mutate<GQLCreateProductMutation, GQLCreateProductMutationVariables>({
                mutation: createProductMutation,
                variables: { scope, input: output },
            });

            if (mutationResponse?.createProduct.errors.length) {
                return mutationResponse.createProduct.errors.reduce(
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

            const newId = mutationResponse?.createProduct.product?.id;
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
                    <FieldSet initiallyExpanded title={<FormattedMessage id="product.fieldSet.general" defaultMessage="General" />}>
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="name"
                            label={<FormattedMessage id="product.name" defaultMessage="Name" />}
                        />
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="slug"
                            label={<FormattedMessage id="product.slug" defaultMessage="Slug" />}
                            validate={validateSlug}
                            helperText={
                                <FormattedMessage
                                    id="product.slug.helperText"
                                    defaultMessage="URL-friendly identifier. Only lowercase letters, numbers, and hyphens."
                                />
                            }
                        />
                        <TextAreaField
                            variant="horizontal"
                            fullWidth
                            name="description"
                            label={<FormattedMessage id="product.description" defaultMessage="Description" />}
                        />
                    </FieldSet>
                    <FieldSet initiallyExpanded title={<FormattedMessage id="product.fieldSet.details" defaultMessage="Details" />}>
                        <TextField
                            required
                            variant="horizontal"
                            fullWidth
                            name="sku"
                            label={<FormattedMessage id="product.sku" defaultMessage="SKU" />}
                            validate={validateSkuFormat}
                            helperText={
                                <FormattedMessage
                                    id="product.sku.helperText"
                                    defaultMessage="Format: 2-4 uppercase letters, hyphen, 4-8 digits (e.g. AB-1234)"
                                />
                            }
                        />
                        <NumberField
                            required
                            variant="horizontal"
                            fullWidth
                            name="price"
                            label={<FormattedMessage id="product.price" defaultMessage="Price" />}
                            validate={validatePositiveNumber}
                            endAdornment={<InputAdornment position="end">&euro;</InputAdornment>}
                        />
                        <ProductTypeSelectField
                            required
                            variant="horizontal"
                            fullWidth
                            name="productType"
                            label={<FormattedMessage id="product.productType" defaultMessage="Product Type" />}
                        />
                    </FieldSet>
                    <FieldSet initiallyExpanded title={<FormattedMessage id="product.fieldSet.publishing" defaultMessage="Publishing" />}>
                        <ProductStatusSelectField
                            required
                            variant="horizontal"
                            fullWidth
                            name="productStatus"
                            label={<FormattedMessage id="product.productStatus" defaultMessage="Product Status" />}
                        />
                        <Future_DateTimePickerField
                            variant="horizontal"
                            fullWidth
                            name="publishedAt"
                            label={<FormattedMessage id="product.publishedAt" defaultMessage="Published At" />}
                        />
                        <SwitchField
                            name="isPublished"
                            fieldLabel={<FormattedMessage id="product.isPublished" defaultMessage="Published" />}
                            variant="horizontal"
                            fullWidth
                        />
                    </FieldSet>
                    <FieldSet initiallyExpanded title={<FormattedMessage id="product.fieldSet.media" defaultMessage="Media" />}>
                        <Field
                            name="mainImage"
                            isEqual={isEqual}
                            label={<FormattedMessage id="product.mainImage" defaultMessage="Main Image" />}
                            variant="horizontal"
                            fullWidth
                        >
                            {createFinalFormBlock(rootBlocks.mainImage)}
                        </Field>
                    </FieldSet>
                </>
            )}
        </FinalForm>
    );
}
