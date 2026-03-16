import { PaginatedResponseFactory } from "@comet/cms-api";
import { ObjectType } from "@nestjs/graphql";
import { ProductReview } from "@src/products/entities/product-review.entity";

@ObjectType()
export class PaginatedProductReviews extends PaginatedResponseFactory.create(ProductReview) {}
