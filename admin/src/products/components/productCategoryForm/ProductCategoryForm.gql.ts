import { gql } from "@apollo/client";

export const productCategoryFormFragment = gql`
    fragment ProductCategoryFormDetails on ProductCategory {
        name
        slug
        parentCategory {
            id
            name
        }
    }
`;

export const productCategoryQuery = gql`
    query ProductCategory($id: ID!) {
        productCategory(id: $id) {
            id
            updatedAt
            ...ProductCategoryFormDetails
        }
    }
    ${productCategoryFormFragment}
`;

export const createProductCategoryMutation = gql`
    mutation CreateProductCategory($scope: ProductCategoryScopeInput!, $input: ProductCategoryInput!) {
        createProductCategory(scope: $scope, input: $input) {
            productCategory {
                id
                updatedAt
                ...ProductCategoryFormDetails
            }
            errors {
                code
                field
            }
        }
    }
    ${productCategoryFormFragment}
`;

export const updateProductCategoryMutation = gql`
    mutation UpdateProductCategory($id: ID!, $input: ProductCategoryUpdateInput!) {
        updateProductCategory(id: $id, input: $input) {
            productCategory {
                id
                updatedAt
                ...ProductCategoryFormDetails
            }
            errors {
                code
                field
            }
        }
    }
    ${productCategoryFormFragment}
`;
