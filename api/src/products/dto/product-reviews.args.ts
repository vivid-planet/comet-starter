import { OffsetBasedPaginationArgs, SortDirection } from "@comet/cms-api";
import { ArgsType, Field } from "@nestjs/graphql";
import { ProductReviewFilter } from "@src/products/dto/product-review.filter";
import { ProductReviewSort, ProductReviewSortField } from "@src/products/dto/product-review.sort";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";

@ArgsType()
export class ProductReviewsArgs extends OffsetBasedPaginationArgs {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    @Field(() => ProductReviewFilter, { nullable: true })
    @ValidateNested()
    @Type(() => ProductReviewFilter)
    @IsOptional()
    filter?: ProductReviewFilter;

    @Field(() => [ProductReviewSort], { defaultValue: [{ field: ProductReviewSortField.createdAt, direction: SortDirection.ASC }] })
    @ValidateNested({ each: true })
    @Type(() => ProductReviewSort)
    sort: ProductReviewSort[];
}
