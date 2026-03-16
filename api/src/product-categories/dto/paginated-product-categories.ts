import { PaginatedResponseFactory } from "@comet/cms-api";
import { ObjectType } from "@nestjs/graphql";
import { ProductCategory } from "@src/product-categories/entities/product-category.entity";

@ObjectType()
export class PaginatedProductCategories extends PaginatedResponseFactory.create(ProductCategory) {}
