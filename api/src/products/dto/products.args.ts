import { OffsetBasedPaginationArgs, SortDirection } from "@comet/cms-api";
import { ArgsType, Field } from "@nestjs/graphql";
import { ProductFilter } from "@src/products/dto/product.filter";
import { ProductSort, ProductSortField } from "@src/products/dto/product.sort";
import { ProductScope } from "@src/products/dto/product-scope.input";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";

@ArgsType()
export class ProductsArgs extends OffsetBasedPaginationArgs {
    @Field(() => ProductScope)
    @ValidateNested()
    @Type(() => ProductScope)
    scope: ProductScope;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    @Field(() => ProductFilter, { nullable: true })
    @ValidateNested()
    @Type(() => ProductFilter)
    @IsOptional()
    filter?: ProductFilter;

    @Field(() => [ProductSort], { defaultValue: [{ field: ProductSortField.createdAt, direction: SortDirection.ASC }] })
    @ValidateNested({ each: true })
    @Type(() => ProductSort)
    sort: ProductSort[];
}
