import { PaginatedResponseFactory } from "@comet/cms-api";
import { ObjectType } from "@nestjs/graphql";
import { ProductVariant } from "@src/products/entities/product-variant.entity";

@ObjectType()
export class PaginatedProductVariants extends PaginatedResponseFactory.create(ProductVariant) {}
