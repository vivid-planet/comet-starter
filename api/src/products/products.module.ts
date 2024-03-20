import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Product } from "./entities/product.entity";
import { ProductResolver } from "./generated/product.resolver";
import { ProductsService } from "./generated/products.service";
import { ProductsConsole } from "./products.console";

@Module({
    imports: [MikroOrmModule.forFeature([Product])],
    providers: [ProductsService, ProductResolver, ProductsConsole],
})
export class ProductsModule {}
