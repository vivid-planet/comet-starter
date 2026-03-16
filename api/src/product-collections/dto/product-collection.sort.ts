import { SortDirection } from "@comet/cms-api";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

export enum ProductCollectionSortField {
    name = "name",
    slug = "slug",
    validFrom = "validFrom",
    validTo = "validTo",
    isActive = "isActive",
    collectionType = "collectionType",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    id = "id",
}

registerEnumType(ProductCollectionSortField, { name: "ProductCollectionSortField" });

@InputType()
export class ProductCollectionSort {
    @Field(() => ProductCollectionSortField)
    @IsEnum(ProductCollectionSortField)
    field: ProductCollectionSortField;

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    @IsEnum(SortDirection)
    direction: SortDirection = SortDirection.ASC;
}
