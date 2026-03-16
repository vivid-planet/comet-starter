import { OffsetBasedPaginationArgs, SortDirection } from "@comet/cms-api";
import { ArgsType, Field, ID } from "@nestjs/graphql";
import { ProductVariantFilter } from "@src/products/dto/product-variant.filter";
import { ProductVariantSort, ProductVariantSortField } from "@src/products/dto/product-variant.sort";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

@ArgsType()
export class ProductVariantsArgs extends OffsetBasedPaginationArgs {
    @Field(() => ID)
    @IsUUID()
    product: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    @Field(() => ProductVariantFilter, { nullable: true })
    @ValidateNested()
    @Type(() => ProductVariantFilter)
    @IsOptional()
    filter?: ProductVariantFilter;

    @Field(() => [ProductVariantSort], { defaultValue: [{ field: ProductVariantSortField.createdAt, direction: SortDirection.ASC }] })
    @ValidateNested({ each: true })
    @Type(() => ProductVariantSort)
    sort: ProductVariantSort[];
}
