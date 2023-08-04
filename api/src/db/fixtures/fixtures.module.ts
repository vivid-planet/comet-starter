import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FixturesConsole } from "@src/db/fixtures/fixtures.console";
import { Product } from "@src/products/entities/product.entity";
import { ConsoleModule } from "nestjs-console";

@Module({
    imports: [MikroOrmModule.forFeature([Product]), ConfigModule, ConsoleModule],
    providers: [FixturesConsole],
    exports: [],
})
export class FixturesModule {}
