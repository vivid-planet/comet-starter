import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { ProductCategory } from "./entities/product-category.entity";
import { ProductCategoriesService } from "./product-categories.service";
import { ProductCategoryResolver } from "./product-category.resolver";

@Module({
    imports: [MikroOrmModule.forFeature([ProductCategory])],
    providers: [ProductCategoriesService, ProductCategoryResolver],
    exports: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
