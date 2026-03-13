import { useMutation, useQuery } from "@apollo/client";
import { InlineAlert, LocalErrorScopeApolloContext, Tooltip } from "@comet/admin";
import { Error } from "@comet/admin-icons";
import { Box } from "@mui/material";
import { ProductTypeChip } from "@src/products/components/productTypeChip/ProductTypeChip";
import { type FunctionComponent } from "react";

import { productTypeForProductQuery, updateProductProductTypeMutation } from "./ProductTypeChipEditableForProduct.gql";
import {
    type GQLProductTypeForProductQuery,
    type GQLProductTypeForProductQueryVariables,
    type GQLUpdateProductProductTypeMutation,
    type GQLUpdateProductProductTypeMutationVariables,
} from "./ProductTypeChipEditableForProduct.gql.generated";

type ProductTypeChipEditableForProductProps = {
    productId: string;
};

export const ProductTypeChipEditableForProduct: FunctionComponent<ProductTypeChipEditableForProductProps> = ({ productId }) => {
    const { data, loading, error } = useQuery<GQLProductTypeForProductQuery, GQLProductTypeForProductQueryVariables>(productTypeForProductQuery, {
        variables: { id: productId },
        context: LocalErrorScopeApolloContext,
    });
    const [updateMutation, { loading: updateLoading }] = useMutation<
        GQLUpdateProductProductTypeMutation,
        GQLUpdateProductProductTypeMutationVariables
    >(updateProductProductTypeMutation);

    if (error) {
        return (
            <Tooltip
                title={
                    <Box margin={4}>
                        <InlineAlert />
                    </Box>
                }
                variant="light"
            >
                <Error color="error" />
            </Tooltip>
        );
    }
    return data?.product.productType ? (
        <ProductTypeChip
            value={data.product.productType}
            loading={loading || updateLoading}
            onSelectItem={(productType) => {
                updateMutation({ variables: { id: productId, productType } });
            }}
        />
    ) : null;
};
