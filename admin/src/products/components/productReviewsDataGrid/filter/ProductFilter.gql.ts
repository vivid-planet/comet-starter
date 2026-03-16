import { gql } from "@apollo/client";

export const productFilterQuery = gql`
    query ProductFilter($scope: ProductScopeInput!, $offset: Int!, $limit: Int!, $search: String) {
        products(scope: $scope, offset: $offset, limit: $limit, search: $search) {
            nodes {
                id
                name
            }
        }
    }
`;
