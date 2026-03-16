import { gql } from "@apollo/client";

const productVariantsFragment = gql`
    fragment ProductVariantsGridItem on ProductVariant {
        id
        image
        name
        sku
        price
        stock
        variantStatus
        isAvailable
    }
`;

export const productVariantsQuery = gql`
    query ProductVariantsGrid(
        $product: ID!
        $offset: Int!
        $limit: Int!
        $sort: [ProductVariantSort!]!
        $search: String
        $filter: ProductVariantFilter
    ) {
        productVariants(product: $product, offset: $offset, limit: $limit, sort: $sort, search: $search, filter: $filter) {
            nodes {
                ...ProductVariantsGridItem
            }
            totalCount
        }
    }
    ${productVariantsFragment}
`;

export const deleteProductVariantMutation = gql`
    mutation DeleteProductVariant($id: ID!) {
        deleteProductVariant(id: $id)
    }
`;
