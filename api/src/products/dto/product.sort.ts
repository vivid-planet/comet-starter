// Scaffolded by the CRUD generator on 2023-03-20.
import { SortDirection } from "@comet/cms-api";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

export enum ProductSortField {
    name = "name",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
}
registerEnumType(ProductSortField, {
    name: "ProductSortField",
});

@InputType()
export class ProductSort {
    @Field(() => ProductSortField)
    @IsEnum(ProductSortField)
    field: ProductSortField;

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    @IsEnum(SortDirection)
    direction: SortDirection = SortDirection.ASC;
}
