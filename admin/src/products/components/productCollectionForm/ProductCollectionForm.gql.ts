import { gql } from "@apollo/client";

export const productCollectionFormFragment = gql`
    fragment ProductCollectionFormDetails on ProductCollection {
        name
        slug
        description
        validFrom
        validTo
        isActive
        collectionType
    }
`;

export const productCollectionQuery = gql`
    query ProductCollectionFormQuery($id: ID!) {
        productCollection(id: $id) {
            id
            updatedAt
            ...ProductCollectionFormDetails
        }
    }
    ${productCollectionFormFragment}
`;

export const createProductCollectionMutation = gql`
    mutation CreateProductCollection($scope: ProductCollectionScopeInput!, $input: ProductCollectionInput!) {
        createProductCollection(scope: $scope, input: $input) {
            productCollection {
                id
                updatedAt
                ...ProductCollectionFormDetails
            }
            errors {
                code
                field
            }
        }
    }
    ${productCollectionFormFragment}
`;

export const updateProductCollectionMutation = gql`
    mutation UpdateProductCollection($id: ID!, $input: ProductCollectionUpdateInput!) {
        updateProductCollection(id: $id, input: $input) {
            productCollection {
                id
                updatedAt
                ...ProductCollectionFormDetails
            }
            errors {
                code
                field
            }
        }
    }
    ${productCollectionFormFragment}
`;
