import { gql } from "@apollo/client";

const productCategoryAsyncAutocompleteFieldFragment = gql`
    fragment ProductCategoryAsyncAutocompleteFieldProductCategory on ProductCategory {
        id
        name
    }
`;

export const productCategoryAsyncAutocompleteFieldQuery = gql`
    query ProductCategoryAsyncAutocompleteField($scope: ProductCategoryScopeInput!, $search: String, $filter: ProductCategoryFilter) {
        productCategories(scope: $scope, search: $search, filter: $filter) {
            nodes {
                ...ProductCategoryAsyncAutocompleteFieldProductCategory
            }
        }
    }
    ${productCategoryAsyncAutocompleteFieldFragment}
`;
