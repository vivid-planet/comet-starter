import { PartialType } from "@comet/cms-api";
import { Field, ID, InputType } from "@nestjs/graphql";
import { Rating } from "@src/products/entities/product-review.entity";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class ProductReviewInput {
    @IsNotEmpty()
    @IsUUID()
    @Field(() => ID)
    product: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    title: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    body: string;

    @IsNotEmpty()
    @IsEnum(Rating)
    @Field(() => Rating)
    rating: Rating;

    @IsNotEmpty()
    @IsString()
    @Field()
    reviewerName: string;

    @IsNotEmpty()
    @IsDate()
    @Field()
    reviewedAt: Date;

    @IsNotEmpty()
    @IsBoolean()
    @Field({ defaultValue: false })
    isApproved: boolean;
}

@InputType()
export class ProductReviewUpdateInput extends PartialType(ProductReviewInput) {}
