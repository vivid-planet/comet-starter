// This file has been generated by comet admin-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.

import { gql } from "@apollo/client";

export const productFormFragment = gql`
    fragment ProductForm on Product {
        name
        description
    }
`;

export const productFormQuery = gql`
    query ProductForm($id: ID!) {
        product(id: $id) {
            id
            updatedAt
            ...ProductForm
        }
    }
    ${productFormFragment}
`;

export const productFormCheckForChangesQuery = gql`
    query ProductFormCheckForChanges($id: ID!) {
        product(id: $id) {
            updatedAt
        }
    }
`;

export const createProductMutation = gql`
    mutation CreateProduct($input: ProductInput!) {
        createProduct(input: $input) {
            id
            updatedAt
            ...ProductForm
        }
    }
    ${productFormFragment}
`;

export const updateProductMutation = gql`
    mutation UpdateProduct($id: ID!, $input: ProductUpdateInput!, $lastUpdatedAt: DateTime) {
        updateProduct(id: $id, input: $input, lastUpdatedAt: $lastUpdatedAt) {
            id
            updatedAt
            ...ProductForm
        }
    }
    ${productFormFragment}
`;
