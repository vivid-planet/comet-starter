import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Customer } from "./entities/customer.entity";
import { CustomerResolver } from "./generated/customer.resolver";

@Module({
    imports: [MikroOrmModule.forFeature([Customer])],
    providers: [CustomerResolver],
})
export class CustomerModule {}
