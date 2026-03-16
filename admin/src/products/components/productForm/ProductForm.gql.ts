import { gql } from "@apollo/client";

export const productFormFragment = gql`
    fragment ProductFormDetails on Product {
        name
        slug
        description
        sku
        price
        productType
        productStatus
        publishedAt
        isPublished
        category {
            id
            name
        }
    }
`;

export const productQuery = gql`
    query Product($id: ID!) {
        product(id: $id) {
            id
            updatedAt
            mainImage
            ...ProductFormDetails
        }
    }
    ${productFormFragment}
`;

export const createProductMutation = gql`
    mutation CreateProduct($scope: ProductScopeInput!, $input: ProductInput!) {
        createProduct(scope: $scope, input: $input) {
            product {
                id
                updatedAt
                ...ProductFormDetails
            }
            errors {
                code
                field
            }
        }
    }
    ${productFormFragment}
`;

export const updateProductMutation = gql`
    mutation UpdateProduct($id: ID!, $input: ProductUpdateInput!) {
        updateProduct(id: $id, input: $input) {
            product {
                id
                updatedAt
                ...ProductFormDetails
            }
            errors {
                code
                field
            }
        }
    }
    ${productFormFragment}
`;
