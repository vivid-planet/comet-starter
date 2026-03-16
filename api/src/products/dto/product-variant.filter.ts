import { BooleanFilter, createEnumFilter, IdFilter, NumberFilter, StringFilter } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { VariantStatus } from "@src/products/entities/product-variant.entity";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

@InputType("VariantStatusEnumFilter")
class VariantStatusFilter extends createEnumFilter(VariantStatus) {}

@InputType()
export class ProductVariantFilter {
    @Field(() => IdFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => IdFilter)
    id?: IdFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    name?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    sku?: StringFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    price?: NumberFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    stock?: NumberFilter;

    @Field(() => BooleanFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => BooleanFilter)
    isAvailable?: BooleanFilter;

    @Field(() => VariantStatusFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => VariantStatusFilter)
    variantStatus?: typeof VariantStatusFilter;

    @Field(() => [ProductVariantFilter], { nullable: true })
    @Type(() => ProductVariantFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    and?: ProductVariantFilter[];

    @Field(() => [ProductVariantFilter], { nullable: true })
    @Type(() => ProductVariantFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    or?: ProductVariantFilter[];
}
