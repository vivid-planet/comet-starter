import { gql } from "@apollo/client";

export const productReviewFormFragment = gql`
    fragment ProductReviewFormDetails on ProductReview {
        title
        body
        rating
        reviewerName
        reviewedAt
        isApproved
        product {
            id
            name
        }
    }
`;

export const productReviewQuery = gql`
    query ProductReview($id: ID!) {
        productReview(id: $id) {
            id
            updatedAt
            ...ProductReviewFormDetails
        }
    }
    ${productReviewFormFragment}
`;

export const createProductReviewMutation = gql`
    mutation CreateProductReview($input: ProductReviewInput!) {
        createProductReview(input: $input) {
            id
            updatedAt
            ...ProductReviewFormDetails
        }
    }
    ${productReviewFormFragment}
`;

export const updateProductReviewMutation = gql`
    mutation UpdateProductReview($id: ID!, $input: ProductReviewUpdateInput!) {
        updateProductReview(id: $id, input: $input) {
            id
            updatedAt
            ...ProductReviewFormDetails
        }
    }
    ${productReviewFormFragment}
`;
