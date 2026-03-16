import { gql } from "@apollo/client";

const productReviewsDataGridFragment = gql`
    fragment ProductReviewsDataGridItem on ProductReview {
        id
        title
        rating
        reviewerName
        reviewedAt
        isApproved
        product {
            id
            name
            domain
            language
        }
    }
`;

export const productReviewsQuery = gql`
    query ProductReviewsDataGrid($offset: Int!, $limit: Int!, $sort: [ProductReviewSort!]!, $search: String, $filter: ProductReviewFilter) {
        productReviews(offset: $offset, limit: $limit, sort: $sort, search: $search, filter: $filter) {
            nodes {
                ...ProductReviewsDataGridItem
            }
            totalCount
        }
    }
    ${productReviewsDataGridFragment}
`;

export const deleteProductReviewMutation = gql`
    mutation DeleteProductReview($id: ID!) {
        deleteProductReview(id: $id)
    }
`;
