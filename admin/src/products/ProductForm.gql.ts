import { gql } from "@apollo/client";

export const productFormFragment = gql`
    fragment ProductForm on Product {
        id
        name
        description
    }
`;

export const productQuery = gql`
    query Product($id: ID!) {
        product(id: $id) {
            ...ProductForm
        }
    }
    ${productFormFragment}
`;

export const createProductMutation = gql`
    mutation CreateProduct($input: ProductInput!) {
        createProduct(input: $input) {
            ...ProductForm
        }
    }
    ${productFormFragment}
`;

export const updateProductMutation = gql`
    mutation UpdateProduct($id: ID!, $input: ProductInput!) {
        updateProduct(id: $id, input: $input) {
            ...ProductForm
        }
    }
    ${productFormFragment}
`;
