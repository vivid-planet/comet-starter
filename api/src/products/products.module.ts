import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ProductCategory } from "@src/product-categories/entities/product-category.entity";

import { Product } from "./entities/product.entity";
import { ProductReview } from "./entities/product-review.entity";
import { ProductVariant } from "./entities/product-variant.entity";
import { ProductResolver } from "./product.resolver";
import { ProductReviewResolver } from "./product-review.resolver";
import { ProductReviewsService } from "./product-reviews.service";
import { ProductVariantResolver } from "./product-variant.resolver";
import { ProductVariantsService } from "./product-variants.service";
import { ProductsService } from "./products.service";

@Module({
    imports: [MikroOrmModule.forFeature([Product, ProductCategory, ProductReview, ProductVariant])],
    providers: [ProductsService, ProductResolver, ProductVariantsService, ProductVariantResolver, ProductReviewsService, ProductReviewResolver],
})
export class ProductsModule {}
