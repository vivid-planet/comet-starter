import { gql } from "@apollo/client";

const productCategoriesFragment = gql`
    fragment ProductCategoriesGridItem on ProductCategory {
        id
        name
        slug
        position
        parentCategory {
            id
            name
        }
    }
`;

export const productCategoriesQuery = gql`
    query ProductCategoriesGrid(
        $scope: ProductCategoryScopeInput!
        $offset: Int!
        $limit: Int!
        $sort: [ProductCategorySort!]!
        $search: String
        $filter: ProductCategoryFilter
    ) {
        productCategories(scope: $scope, offset: $offset, limit: $limit, sort: $sort, search: $search, filter: $filter) {
            nodes {
                ...ProductCategoriesGridItem
            }
            totalCount
        }
    }
    ${productCategoriesFragment}
`;

export const deleteProductCategoryMutation = gql`
    mutation DeleteProductCategory($id: ID!) {
        deleteProductCategory(id: $id)
    }
`;

export const updateProductCategoryPositionMutation = gql`
    mutation UpdateProductCategoryPosition($id: ID!, $input: ProductCategoryUpdateInput!) {
        updateProductCategory(id: $id, input: $input) {
            productCategory {
                id
                position
                updatedAt
            }
            errors {
                code
                field
            }
        }
    }
`;
