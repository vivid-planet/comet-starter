import { SortDirection } from "@comet/cms-api";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

export enum ProductVariantSortField {
    name = "name",
    sku = "sku",
    price = "price",
    stock = "stock",
    isAvailable = "isAvailable",
    variantStatus = "variantStatus",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    id = "id",
}

registerEnumType(ProductVariantSortField, { name: "ProductVariantSortField" });

@InputType()
export class ProductVariantSort {
    @Field(() => ProductVariantSortField)
    @IsEnum(ProductVariantSortField)
    field: ProductVariantSortField;

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    @IsEnum(SortDirection)
    direction: SortDirection = SortDirection.ASC;
}
