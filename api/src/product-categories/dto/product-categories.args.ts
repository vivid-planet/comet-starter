import { OffsetBasedPaginationArgs, SortDirection } from "@comet/cms-api";
import { ArgsType, Field } from "@nestjs/graphql";
import { ProductCategoryFilter } from "@src/product-categories/dto/product-category.filter";
import { ProductCategorySort, ProductCategorySortField } from "@src/product-categories/dto/product-category.sort";
import { ProductCategoryScope } from "@src/product-categories/dto/product-category-scope.input";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";

@ArgsType()
export class ProductCategoriesArgs extends OffsetBasedPaginationArgs {
    @Field(() => ProductCategoryScope)
    @ValidateNested()
    @Type(() => ProductCategoryScope)
    scope: ProductCategoryScope;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    @Field(() => ProductCategoryFilter, { nullable: true })
    @ValidateNested()
    @Type(() => ProductCategoryFilter)
    @IsOptional()
    filter?: ProductCategoryFilter;

    @Field(() => [ProductCategorySort], { defaultValue: [{ field: ProductCategorySortField.position, direction: SortDirection.ASC }] })
    @ValidateNested({ each: true })
    @Type(() => ProductCategorySort)
    sort: ProductCategorySort[];
}
