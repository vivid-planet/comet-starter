import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ProductCategory } from "@src/product-categories/entities/product-category.entity";

import { Product } from "./entities/product.entity";
import { ProductVariant } from "./entities/product-variant.entity";
import { ProductResolver } from "./product.resolver";
import { ProductVariantResolver } from "./product-variant.resolver";
import { ProductVariantsService } from "./product-variants.service";
import { ProductsService } from "./products.service";

@Module({
    imports: [MikroOrmModule.forFeature([Product, ProductCategory, ProductVariant])],
    providers: [ProductsService, ProductResolver, ProductVariantsService, ProductVariantResolver],
})
export class ProductsModule {}
