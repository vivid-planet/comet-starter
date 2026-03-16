import { gql } from "@apollo/client";

export const productVariantToolbarQuery = gql`
    query ProductVariantToolbar($id: ID!) {
        productVariant(id: $id) {
            id
            name
            sku
        }
    }
`;
