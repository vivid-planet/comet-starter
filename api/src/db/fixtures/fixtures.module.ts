import { DependenciesModule } from "@comet/cms-api";
import { Module } from "@nestjs/common";
import { FixturesCommand } from "@src/db/fixtures/fixtures.command";

@Module({
    imports: [DependenciesModule],
    providers: [FixturesCommand],
    exports: [],
})
export class FixturesModule {}
