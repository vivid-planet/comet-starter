import { BooleanFilter, createEnumFilter, DateTimeFilter, IdFilter, ManyToOneFilter, StringFilter } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { Rating } from "@src/products/entities/product-review.entity";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

@InputType("RatingEnumFilter")
class RatingFilter extends createEnumFilter(Rating) {}

@InputType()
export class ProductReviewFilter {
    @Field(() => IdFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => IdFilter)
    id?: IdFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    title?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    body?: StringFilter;

    @Field(() => RatingFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => RatingFilter)
    rating?: typeof RatingFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    reviewerName?: StringFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateTimeFilter)
    reviewedAt?: DateTimeFilter;

    @Field(() => BooleanFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => BooleanFilter)
    isApproved?: BooleanFilter;

    @Field(() => ManyToOneFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ManyToOneFilter)
    product?: ManyToOneFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateTimeFilter)
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateTimeFilter)
    updatedAt?: DateTimeFilter;

    @Field(() => [ProductReviewFilter], { nullable: true })
    @Type(() => ProductReviewFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    and?: ProductReviewFilter[];

    @Field(() => [ProductReviewFilter], { nullable: true })
    @Type(() => ProductReviewFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    or?: ProductReviewFilter[];
}
