import { SortDirection } from "@comet/cms-api";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

export enum ProductSortField {
    name = "name",
    slug = "slug",
    price = "price",
    sku = "sku",
    publishedAt = "publishedAt",
    isPublished = "isPublished",
    productStatus = "productStatus",
    productType = "productType",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    id = "id",
}

registerEnumType(ProductSortField, { name: "ProductSortField" });

@InputType()
export class ProductSort {
    @Field(() => ProductSortField)
    @IsEnum(ProductSortField)
    field: ProductSortField;

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    @IsEnum(SortDirection)
    direction: SortDirection = SortDirection.ASC;
}
