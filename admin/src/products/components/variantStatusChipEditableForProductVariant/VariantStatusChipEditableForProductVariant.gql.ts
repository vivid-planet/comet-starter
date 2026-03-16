import { gql } from "@apollo/client";

export const variantStatusForProductVariantQuery = gql`
    query VariantStatusForProductVariant($id: ID!) {
        productVariant(id: $id) {
            id
            variantStatus
        }
    }
`;

export const updateProductVariantVariantStatusMutation = gql`
    mutation UpdateProductVariantVariantStatus($id: ID!, $variantStatus: VariantStatus!) {
        updateProductVariant(id: $id, input: { variantStatus: $variantStatus }) {
            productVariant {
                id
                variantStatus
            }
        }
    }
`;
