import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ProductCategory } from "@src/product-categories/entities/product-category.entity";

import { Product } from "./entities/product.entity";
import { ProductResolver } from "./product.resolver";
import { ProductsService } from "./products.service";

@Module({
    imports: [MikroOrmModule.forFeature([Product, ProductCategory])],
    providers: [ProductsService, ProductResolver],
})
export class ProductsModule {}
