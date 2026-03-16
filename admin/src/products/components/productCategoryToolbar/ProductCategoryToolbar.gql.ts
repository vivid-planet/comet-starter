import { gql } from "@apollo/client";

export const productCategoryToolbarQuery = gql`
    query ProductCategoryToolbar($id: ID!) {
        productCategory(id: $id) {
            id
            name
        }
    }
`;
