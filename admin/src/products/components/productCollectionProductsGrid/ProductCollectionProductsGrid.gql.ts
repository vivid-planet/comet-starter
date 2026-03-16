import { gql } from "@apollo/client";

export const productCollectionProductsQuery = gql`
    query ProductCollectionProducts($id: ID!) {
        productCollection(id: $id) {
            id
            products {
                id
                name
                productType
            }
        }
    }
`;

export const selectProductsQuery = gql`
    query SelectProducts($scope: ProductScopeInput!, $offset: Int!, $limit: Int!, $sort: [ProductSort!]!, $search: String, $filter: ProductFilter) {
        products(scope: $scope, offset: $offset, limit: $limit, sort: $sort, search: $search, filter: $filter) {
            nodes {
                id
                name
                productType
            }
            totalCount
        }
    }
`;

export const updateProductCollectionProductsMutation = gql`
    mutation UpdateProductCollectionProducts($id: ID!, $input: ProductCollectionUpdateInput!) {
        updateProductCollection(id: $id, input: $input) {
            productCollection {
                id
                products {
                    id
                    name
                    productType
                }
            }
            errors {
                code
                field
            }
        }
    }
`;
