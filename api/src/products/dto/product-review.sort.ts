import { SortDirection } from "@comet/cms-api";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

export enum ProductReviewSortField {
    title = "title",
    rating = "rating",
    reviewerName = "reviewerName",
    reviewedAt = "reviewedAt",
    isApproved = "isApproved",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    id = "id",
}

registerEnumType(ProductReviewSortField, { name: "ProductReviewSortField" });

@InputType()
export class ProductReviewSort {
    @Field(() => ProductReviewSortField)
    @IsEnum(ProductReviewSortField)
    field: ProductReviewSortField;

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    @IsEnum(SortDirection)
    direction: SortDirection = SortDirection.ASC;
}
