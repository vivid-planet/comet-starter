import { MikroORM, UseRequestContext } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable, Logger } from "@nestjs/common";
import { generateProducts } from "@src/db/fixtures/generators/product.fixture";
import { Product } from "@src/products/entities/product.entity";
import { MultiBar, Options, Presets } from "cli-progress";
import { Command, Console } from "nestjs-console";

@Injectable()
@Console()
export class FixturesConsole {
    private readonly logger = new Logger(FixturesConsole.name);

    constructor(private readonly orm: MikroORM, @InjectRepository(Product) private readonly productsRepository: EntityRepository<Product>) {}

    barOptions: Options = {
        format: `{bar} {percentage}% | {value}/{total} {title} | ETA: {eta_formatted} | Duration: {duration_formatted}`,
        noTTYOutput: true,
    };

    @Command({
        command: "fixtures [total]",
        description: "Create fixtures with faker.js",
    })
    @UseRequestContext()
    async execute(total?: string | number): Promise<void> {
        total = total === undefined ? 10 : Number(total);

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
        await Promise.all([generateProducts({ repository: this.productsRepository, bar: multiBar.create(total, 0), total })]);
        multiBar.stop();

        await this.orm.em.flush();
    }
}
