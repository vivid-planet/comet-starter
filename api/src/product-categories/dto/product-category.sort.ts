import { SortDirection } from "@comet/cms-api";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

export enum ProductCategorySortField {
    name = "name",
    slug = "slug",
    position = "position",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    id = "id",
}

registerEnumType(ProductCategorySortField, { name: "ProductCategorySortField" });

@InputType()
export class ProductCategorySort {
    @Field(() => ProductCategorySortField)
    @IsEnum(ProductCategorySortField)
    field: ProductCategorySortField;

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    @IsEnum(SortDirection)
    direction: SortDirection = SortDirection.ASC;
}
