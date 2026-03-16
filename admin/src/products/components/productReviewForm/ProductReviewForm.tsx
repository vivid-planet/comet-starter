import { useApolloClient, useQuery } from "@apollo/client";
import {
    filterByFragment,
    FinalForm,
    type FinalFormSubmitEvent,
    Future_DateTimePickerField,
    Loading,
    SwitchField,
    TextAreaField,
    TextField,
    useFormApiRef,
} from "@comet/admin";
import { queryUpdatedAt, resolveHasSaveConflict, useFormSaveConflict } from "@comet/cms-admin";
import { DialogContent } from "@mui/material";
import { ProductAsyncAutocompleteField } from "@src/products/components/productAsyncAutocompleteField/ProductAsyncAutocompleteField";
import { RatingSelectField } from "@src/products/components/ratingSelectField/RatingSelectField";
import { type FormApi } from "final-form";
import isEqual from "lodash.isequal";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { createProductReviewMutation, productReviewFormFragment, productReviewQuery, updateProductReviewMutation } from "./ProductReviewForm.gql";
import {
    type GQLCreateProductReviewMutation,
    type GQLCreateProductReviewMutationVariables,
    type GQLProductReviewFormDetailsFragment,
    type GQLProductReviewQuery,
    type GQLProductReviewQueryVariables,
    type GQLUpdateProductReviewMutation,
    type GQLUpdateProductReviewMutationVariables,
} from "./ProductReviewForm.gql.generated";

type ProductReviewFormDetailsFragment = Omit<GQLProductReviewFormDetailsFragment, "reviewedAt"> & {
    reviewedAt?: Date | null;
};

type FormValues = ProductReviewFormDetailsFragment;

interface ProductReviewFormProps {
    id?: string;
}

export function ProductReviewForm({ id }: ProductReviewFormProps) {
    const client = useApolloClient();
    const mode = id ? "edit" : "add";
    const formApiRef = useFormApiRef<FormValues>();

    const { data, error, loading, refetch } = useQuery<GQLProductReviewQuery, GQLProductReviewQueryVariables>(
        productReviewQuery,
        id ? { variables: { id } } : { skip: true },
    );

    const initialValues = useMemo<Partial<FormValues>>(
        () =>
            data?.productReview
                ? {
                      ...filterByFragment<GQLProductReviewFormDetailsFragment>(productReviewFormFragment, data.productReview),
                      reviewedAt: data.productReview.reviewedAt ? new Date(data.productReview.reviewedAt) : undefined,
                  }
                : {
                      isApproved: false,
                  },
        [data],
    );

    const saveConflict = useFormSaveConflict({
        checkConflict: async () => {
            const updatedAt = await queryUpdatedAt(client, "productReview", id);
            return resolveHasSaveConflict(data?.productReview.updatedAt, updatedAt);
        },
        formApiRef,
        loadLatestVersion: async () => {
            await refetch();
        },
    });

    const handleSubmit = async (formValues: FormValues, form: FormApi<FormValues>, event: FinalFormSubmitEvent) => {
        if (await saveConflict.checkForConflicts()) throw new Error("Conflicts detected");

        const output = {
            title: formValues.title,
            body: formValues.body,
            rating: formValues.rating,
            reviewerName: formValues.reviewerName,
            reviewedAt: formValues.reviewedAt ? formValues.reviewedAt.toISOString() : null,
            isApproved: formValues.isApproved,
            product: formValues.product?.id,
        };

        if (mode === "edit") {
            if (!id) throw new Error();
            await client.mutate<GQLUpdateProductReviewMutation, GQLUpdateProductReviewMutationVariables>({
                mutation: updateProductReviewMutation,
                variables: { id, input: output },
            });
        } else {
            if (!output.product) throw new Error("Product is required");
            if (!output.reviewedAt) throw new Error("Reviewed at is required");
            await client.mutate<GQLCreateProductReviewMutation, GQLCreateProductReviewMutationVariables>({
                mutation: createProductReviewMutation,
                variables: { input: { ...output, product: output.product, reviewedAt: output.reviewedAt } },
            });
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
                <DialogContent>
                    {saveConflict.dialogs}
                    <ProductAsyncAutocompleteField
                        required
                        name="product"
                        label={<FormattedMessage id="productReview.product" defaultMessage="Product" />}
                    />
                    <TextField
                        required
                        variant="horizontal"
                        fullWidth
                        name="title"
                        label={<FormattedMessage id="productReview.title" defaultMessage="Title" />}
                    />
                    <TextAreaField
                        required
                        variant="horizontal"
                        fullWidth
                        name="body"
                        label={<FormattedMessage id="productReview.body" defaultMessage="Body" />}
                    />
                    <RatingSelectField
                        required
                        variant="horizontal"
                        fullWidth
                        name="rating"
                        label={<FormattedMessage id="productReview.rating" defaultMessage="Rating" />}
                    />
                    <TextField
                        required
                        variant="horizontal"
                        fullWidth
                        name="reviewerName"
                        label={<FormattedMessage id="productReview.reviewerName" defaultMessage="Reviewer Name" />}
                    />
                    <Future_DateTimePickerField
                        required
                        variant="horizontal"
                        fullWidth
                        name="reviewedAt"
                        label={<FormattedMessage id="productReview.reviewedAt" defaultMessage="Reviewed At" />}
                    />
                    <SwitchField
                        name="isApproved"
                        fieldLabel={<FormattedMessage id="productReview.isApproved" defaultMessage="Approved" />}
                        variant="horizontal"
                        fullWidth
                    />
                </DialogContent>
            )}
        </FinalForm>
    );
}
