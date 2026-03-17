import { PaginatedResponseFactory } from "@comet/cms-api";
import { ObjectType } from "@nestjs/graphql";
import { Product } from "@src/products/entities/product.entity";

@ObjectType()
export class PaginatedProducts extends PaginatedResponseFactory.create(Product) {}
