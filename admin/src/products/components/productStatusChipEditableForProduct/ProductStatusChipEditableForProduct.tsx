import { useMutation, useQuery } from "@apollo/client";
import { InlineAlert, LocalErrorScopeApolloContext, Tooltip } from "@comet/admin";
import { Error } from "@comet/admin-icons";
import { Box } from "@mui/material";
import { ProductStatusChip } from "@src/products/components/productStatusChip/ProductStatusChip";
import { type FunctionComponent } from "react";

import { productStatusForProductQuery, updateProductProductStatusMutation } from "./ProductStatusChipEditableForProduct.gql";
import {
    type GQLProductStatusForProductQuery,
    type GQLProductStatusForProductQueryVariables,
    type GQLUpdateProductProductStatusMutation,
    type GQLUpdateProductProductStatusMutationVariables,
} from "./ProductStatusChipEditableForProduct.gql.generated";

type ProductStatusChipEditableForProductProps = {
    productId: string;
};

export const ProductStatusChipEditableForProduct: FunctionComponent<ProductStatusChipEditableForProductProps> = ({ productId }) => {
    const { data, loading, error } = useQuery<GQLProductStatusForProductQuery, GQLProductStatusForProductQueryVariables>(
        productStatusForProductQuery,
        {
            variables: { id: productId },
            context: LocalErrorScopeApolloContext,
        },
    );
    const [updateMutation, { loading: updateLoading }] = useMutation<
        GQLUpdateProductProductStatusMutation,
        GQLUpdateProductProductStatusMutationVariables
    >(updateProductProductStatusMutation);

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
    return data?.product.productStatus ? (
        <ProductStatusChip
            value={data.product.productStatus}
            loading={loading || updateLoading}
            onSelectItem={(productStatus) => {
                updateMutation({ variables: { id: productId, productStatus } });
            }}
        />
    ) : null;
};
