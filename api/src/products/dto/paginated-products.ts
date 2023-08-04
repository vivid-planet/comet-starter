// Scaffolded by the CRUD generator on 2023-03-20.
import { PaginatedResponseFactory } from "@comet/cms-api";
import { ObjectType } from "@nestjs/graphql";

import { Product } from "../entities/product.entity";

@ObjectType()
export class PaginatedProducts extends PaginatedResponseFactory.create(Product) {}
