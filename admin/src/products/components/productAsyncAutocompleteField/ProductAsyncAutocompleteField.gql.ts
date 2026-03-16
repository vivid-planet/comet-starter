import { gql } from "@apollo/client";

const productAsyncAutocompleteFieldFragment = gql`
    fragment ProductAsyncAutocompleteFieldProduct on Product {
        id
        name
    }
`;

export const productAsyncAutocompleteFieldQuery = gql`
    query ProductAsyncAutocompleteField($scope: ProductScopeInput!, $search: String, $filter: ProductFilter) {
        products(scope: $scope, search: $search, filter: $filter) {
            nodes {
                ...ProductAsyncAutocompleteFieldProduct
            }
        }
    }
    ${productAsyncAutocompleteFieldFragment}
`;
