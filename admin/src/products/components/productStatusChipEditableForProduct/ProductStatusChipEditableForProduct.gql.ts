import { gql } from "@apollo/client";

export const productStatusForProductQuery = gql`
    query ProductStatusForProduct($id: ID!) {
        product(id: $id) {
            id
            productStatus
        }
    }
`;

export const updateProductProductStatusMutation = gql`
    mutation UpdateProductProductStatus($id: ID!, $productStatus: ProductStatus!) {
        updateProduct(id: $id, input: { productStatus: $productStatus }) {
            product {
                id
                productStatus
            }
        }
    }
`;
