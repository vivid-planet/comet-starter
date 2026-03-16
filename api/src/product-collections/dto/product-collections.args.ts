import { OffsetBasedPaginationArgs, SortDirection } from "@comet/cms-api";
import { ArgsType, Field } from "@nestjs/graphql";
import { ProductCollectionFilter } from "@src/product-collections/dto/product-collection.filter";
import { ProductCollectionSort, ProductCollectionSortField } from "@src/product-collections/dto/product-collection.sort";
import { ProductCollectionScope } from "@src/product-collections/dto/product-collection-scope.input";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";

@ArgsType()
export class ProductCollectionsArgs extends OffsetBasedPaginationArgs {
    @Field(() => ProductCollectionScope)
    @ValidateNested()
    @Type(() => ProductCollectionScope)
    scope: ProductCollectionScope;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    @Field(() => ProductCollectionFilter, { nullable: true })
    @ValidateNested()
    @Type(() => ProductCollectionFilter)
    @IsOptional()
    filter?: ProductCollectionFilter;

    @Field(() => [ProductCollectionSort], { defaultValue: [{ field: ProductCollectionSortField.createdAt, direction: SortDirection.ASC }] })
    @ValidateNested({ each: true })
    @Type(() => ProductCollectionSort)
    sort: ProductCollectionSort[];
}
