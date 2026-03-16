import { gql } from "@apollo/client";

export const productVariantFormFragment = gql`
    fragment ProductVariantFormDetails on ProductVariant {
        name
        sku
        variantStatus
        price
        stock
        isAvailable
    }
`;

export const productVariantQuery = gql`
    query ProductVariant($id: ID!) {
        productVariant(id: $id) {
            id
            updatedAt
            image
            ...ProductVariantFormDetails
        }
    }
    ${productVariantFormFragment}
`;

export const createProductVariantMutation = gql`
    mutation CreateProductVariant($product: ID!, $input: ProductVariantInput!) {
        createProductVariant(product: $product, input: $input) {
            productVariant {
                id
                updatedAt
                ...ProductVariantFormDetails
            }
            errors {
                code
                field
            }
        }
    }
    ${productVariantFormFragment}
`;

export const updateProductVariantMutation = gql`
    mutation UpdateProductVariant($id: ID!, $input: ProductVariantUpdateInput!) {
        updateProductVariant(id: $id, input: $input) {
            productVariant {
                id
                updatedAt
                ...ProductVariantFormDetails
            }
            errors {
                code
                field
            }
        }
    }
    ${productVariantFormFragment}
`;
