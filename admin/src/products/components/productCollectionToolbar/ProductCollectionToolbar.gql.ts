import { gql } from "@apollo/client";

export const productCollectionToolbarQuery = gql`
    query ProductCollectionToolbar($id: ID!) {
        productCollection(id: $id) {
            id
            name
            collectionType
        }
    }
`;
