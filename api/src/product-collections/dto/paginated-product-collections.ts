import { PaginatedResponseFactory } from "@comet/cms-api";
import { ObjectType } from "@nestjs/graphql";
import { ProductCollection } from "@src/product-collections/entities/product-collection.entity";

@ObjectType()
export class PaginatedProductCollections extends PaginatedResponseFactory.create(ProductCollection) {}
