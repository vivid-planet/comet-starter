import { useMutation, useQuery } from "@apollo/client";
import { InlineAlert, LocalErrorScopeApolloContext, Tooltip } from "@comet/admin";
import { Error } from "@comet/admin-icons";
import { Box } from "@mui/material";
import { VariantStatusChip } from "@src/products/components/variantStatusChip/VariantStatusChip";
import { type FunctionComponent } from "react";

import { updateProductVariantVariantStatusMutation, variantStatusForProductVariantQuery } from "./VariantStatusChipEditableForProductVariant.gql";
import {
    type GQLUpdateProductVariantVariantStatusMutation,
    type GQLUpdateProductVariantVariantStatusMutationVariables,
    type GQLVariantStatusForProductVariantQuery,
    type GQLVariantStatusForProductVariantQueryVariables,
} from "./VariantStatusChipEditableForProductVariant.gql.generated";

type VariantStatusChipEditableForProductVariantProps = {
    productVariantId: string;
};

export const VariantStatusChipEditableForProductVariant: FunctionComponent<VariantStatusChipEditableForProductVariantProps> = ({
    productVariantId,
}) => {
    const { data, loading, error } = useQuery<GQLVariantStatusForProductVariantQuery, GQLVariantStatusForProductVariantQueryVariables>(
        variantStatusForProductVariantQuery,
        {
            variables: { id: productVariantId },
            context: LocalErrorScopeApolloContext,
        },
    );
    const [updateMutation, { loading: updateLoading }] = useMutation<
        GQLUpdateProductVariantVariantStatusMutation,
        GQLUpdateProductVariantVariantStatusMutationVariables
    >(updateProductVariantVariantStatusMutation);

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
    return data?.productVariant.variantStatus ? (
        <VariantStatusChip
            value={data.productVariant.variantStatus}
            loading={loading || updateLoading}
            onSelectItem={(variantStatus) => {
                updateMutation({ variables: { id: productVariantId, variantStatus } });
            }}
        />
    ) : null;
};
