import { gql } from "@apollo/client";

export const productTypeForProductQuery = gql`
    query ProductTypeForProduct($id: ID!) {
        product(id: $id) {
            id
            productType
        }
    }
`;

export const updateProductProductTypeMutation = gql`
    mutation UpdateProductProductType($id: ID!, $productType: ProductType!) {
        updateProduct(id: $id, input: { productType: $productType }) {
            product {
                id
                productType
            }
        }
    }
`;
