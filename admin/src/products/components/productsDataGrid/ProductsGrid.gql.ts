import { gql } from "@apollo/client";

const productsFragment = gql`
    fragment ProductsGridItem on Product {
        id
        mainImage
        name
        sku
        productType
        price
        productStatus
        publishedAt
        isPublished
        category {
            id
            name
        }
    }
`;

export const productsQuery = gql`
    query ProductsGrid($scope: ProductScopeInput!, $offset: Int!, $limit: Int!, $sort: [ProductSort!]!, $search: String, $filter: ProductFilter) {
        products(scope: $scope, offset: $offset, limit: $limit, sort: $sort, search: $search, filter: $filter) {
            nodes {
                ...ProductsGridItem
            }
            totalCount
        }
    }
    ${productsFragment}
`;

export const deleteProductMutation = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;
