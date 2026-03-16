import { BooleanFilter, createEnumFilter, DateTimeFilter, IdFilter, ManyToManyFilter, StringFilter } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { CollectionType } from "@src/product-collections/entities/product-collection.entity";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

@InputType("CollectionTypeEnumFilter")
class CollectionTypeFilter extends createEnumFilter(CollectionType) {}

@InputType()
export class ProductCollectionFilter {
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

    @Field(() => DateTimeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateTimeFilter)
    validFrom?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateTimeFilter)
    validTo?: DateTimeFilter;

    @Field(() => BooleanFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => BooleanFilter)
    isActive?: BooleanFilter;

    @Field(() => CollectionTypeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => CollectionTypeFilter)
    collectionType?: typeof CollectionTypeFilter;

    @Field(() => ManyToManyFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ManyToManyFilter)
    products?: ManyToManyFilter;

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

    @Field(() => [ProductCollectionFilter], { nullable: true })
    @Type(() => ProductCollectionFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    and?: ProductCollectionFilter[];

    @Field(() => [ProductCollectionFilter], { nullable: true })
    @Type(() => ProductCollectionFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    or?: ProductCollectionFilter[];
}
