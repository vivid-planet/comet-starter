import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Product } from "@src/products/entities/product.entity";

import { ProductCollection } from "./entities/product-collection.entity";
import { ProductCollectionResolver } from "./product-collection.resolver";
import { ProductCollectionsService } from "./product-collections.service";

@Module({
    imports: [MikroOrmModule.forFeature([ProductCollection, Product])],
    providers: [ProductCollectionsService, ProductCollectionResolver],
})
export class ProductCollectionsModule {}
