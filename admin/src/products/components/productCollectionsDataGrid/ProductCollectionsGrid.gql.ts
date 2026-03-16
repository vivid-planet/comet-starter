import { gql } from "@apollo/client";

const productCollectionsFragment = gql`
    fragment ProductCollectionsGridItem on ProductCollection {
        id
        name
        collectionType
        productCount
        validFrom
        validTo
        isActive
        updatedAt
    }
`;

export const productCollectionsQuery = gql`
    query ProductCollectionsGridList(
        $scope: ProductCollectionScopeInput!
        $offset: Int!
        $limit: Int!
        $sort: [ProductCollectionSort!]!
        $search: String
        $filter: ProductCollectionFilter
    ) {
        productCollections(scope: $scope, offset: $offset, limit: $limit, sort: $sort, search: $search, filter: $filter) {
            nodes {
                ...ProductCollectionsGridItem
            }
            totalCount
        }
    }
    ${productCollectionsFragment}
`;

export const deleteProductCollectionMutation = gql`
    mutation DeleteProductCollection($id: ID!) {
        deleteProductCollection(id: $id)
    }
`;
