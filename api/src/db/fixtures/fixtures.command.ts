import { DependenciesService } from "@comet/cms-api";
import { CreateRequestContext, MikroORM } from "@mikro-orm/core";
import { Inject, Logger } from "@nestjs/common";
import { Config } from "@src/config/config";
import { CONFIG } from "@src/config/config.module";
import { MultiBar, Options, Presets } from "cli-progress";
import { Command, CommandRunner } from "nest-commander";

@Command({
    name: "fixtures",
    description: "Create fixtures with faker.js",
})
export class FixturesCommand extends CommandRunner {
    private readonly logger = new Logger(FixturesCommand.name);

    barOptions: Options = {
        format: `{bar} {percentage}% | {value}/{total} {title} | ETA: {eta_formatted} | Duration: {duration_formatted}`,
        noTTYOutput: true,
    };

    constructor(
        @Inject(CONFIG) private readonly config: Config,
        private readonly dependenciesService: DependenciesService,
        private readonly orm: MikroORM,
    ) {
        super();
    }

    @CreateRequestContext()
    async run(): Promise<void> {
        this.logger.log(`Drop tables...`);
        const connection = this.orm.em.getConnection();

        const tables = await connection.execute(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public' ORDER BY tablename;`);

        for (const table of tables) {
            await connection.execute(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`);
        }

        this.logger.log(`Run migrations...`);
        const migrator = this.orm.getMigrator();
        await migrator.up();

        const multiBar = new MultiBar(this.barOptions, Presets.shades_classic);
        // Add your fixtures here
        multiBar.stop();

        await this.dependenciesService.createViews();

        await this.orm.em.flush();
    }
}
