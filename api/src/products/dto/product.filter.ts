import { BooleanFilter, createEnumFilter, DateTimeFilter, IdFilter, ManyToOneFilter, NumberFilter, StringFilter } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { ProductStatus, ProductType } from "@src/products/entities/product.entity";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

@InputType("ProductStatusEnumFilter")
class ProductStatusFilter extends createEnumFilter(ProductStatus) {}

@InputType("ProductTypeEnumFilter")
class ProductTypeFilter extends createEnumFilter(ProductType) {}

@InputType()
export class ProductFilter {
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
    slug?: StringFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    price?: NumberFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    sku?: StringFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateTimeFilter)
    publishedAt?: DateTimeFilter;

    @Field(() => BooleanFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => BooleanFilter)
    isPublished?: BooleanFilter;

    @Field(() => ProductStatusFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ProductStatusFilter)
    productStatus?: typeof ProductStatusFilter;

    @Field(() => ProductTypeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ProductTypeFilter)
    productType?: typeof ProductTypeFilter;

    @Field(() => ManyToOneFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ManyToOneFilter)
    category?: ManyToOneFilter;

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

    @Field(() => [ProductFilter], { nullable: true })
    @Type(() => ProductFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    and?: ProductFilter[];

    @Field(() => [ProductFilter], { nullable: true })
    @Type(() => ProductFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    or?: ProductFilter[];
}
