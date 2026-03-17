import { gql } from "@apollo/client";

export const productToolbarQuery = gql`
    query ProductToolbar($id: ID!) {
        product(id: $id) {
            id
            name
            sku
        }
    }
`;
