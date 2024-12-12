import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { FooterResolver } from "@src/footers/generated/footer.resolver";
import { FootersService } from "@src/footers/generated/footers.service";

import { Footer } from "./entities/footer.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Footer])],
    providers: [FootersService, FooterResolver],
})
export class FootersModule {}
