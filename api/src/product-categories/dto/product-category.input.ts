import { IsSlug, PartialType } from "@comet/cms-api";
import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";

@InputType()
export class ProductCategoryInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    name: string;

    @IsNotEmpty()
    @IsSlug()
    @Field()
    slug: string;

    @IsOptional()
    @Min(1)
    @IsInt()
    @Field(() => Int, { nullable: true })
    position?: number;

    @IsOptional()
    @IsUUID()
    @Field(() => ID, { nullable: true })
    parentCategory?: string;
}

@InputType()
export class ProductCategoryUpdateInput extends PartialType(ProductCategoryInput) {}
