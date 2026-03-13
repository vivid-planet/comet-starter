import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Product } from "./entities/product.entity";
import { ProductResolver } from "./product.resolver";
import { ProductsService } from "./products.service";

@Module({
    imports: [MikroOrmModule.forFeature([Product])],
    providers: [ProductsService, ProductResolver],
})
export class ProductsModule {}
