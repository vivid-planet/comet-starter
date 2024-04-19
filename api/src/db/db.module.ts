import { DependenciesModule, MikroOrmModule } from "@comet/cms-api";
import { Module } from "@nestjs/common";
import { FixturesModule } from "@src/db/fixtures/fixtures.module";
import { ormConfig } from "@src/db/ormconfig";

import { MigrateConsole } from "./migrate.console";

@Module({
    imports: [MikroOrmModule.forRoot({ ormConfig }), FixturesModule, DependenciesModule],
    providers: [MigrateConsole],
})
export class DbModule {}
