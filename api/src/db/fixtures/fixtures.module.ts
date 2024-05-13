import { DependenciesModule } from "@comet/cms-api";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FixturesConsole } from "@src/db/fixtures/fixtures.console";
import { ConsoleModule } from "nestjs-console";

@Module({
    imports: [ConfigModule, ConsoleModule, DependenciesModule],
    providers: [FixturesConsole],
    exports: [],
})
export class FixturesModule {}
