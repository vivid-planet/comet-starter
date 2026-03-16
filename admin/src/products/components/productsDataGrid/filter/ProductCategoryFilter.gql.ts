import { gql } from "@apollo/client";

export const productCategoryFilterQuery = gql`
    query ProductCategoryFilter($scope: ProductCategoryScopeInput!, $offset: Int!, $limit: Int!, $search: String) {
        productCategories(scope: $scope, offset: $offset, limit: $limit, search: $search) {
            nodes {
                id
                name
            }
        }
    }
`;
