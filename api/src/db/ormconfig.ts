import { createMigrationsList, createOrmConfig } from "@comet/cms-api";
import { EntityCaseNamingStrategy } from "@mikro-orm/core";
import path from "path";

export const ormConfig = createOrmConfig({
    type: "postgresql",
    host: process.env.POSTGRESQL_HOST,
    port: Number(process.env.POSTGRESQL_PORT),
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    dbName: process.env.POSTGRESQL_DB,
    driverOptions: {
        connection: { ssl: process.env.POSTGRESQL_USE_SSL === "true" },
    },
    namingStrategy: EntityCaseNamingStrategy,
    debug: false,
    migrations: {
        tableName: "Migrations",
        //  `path` is only used to tell MikroORM where to place newly generated migrations. Available migrations are defined using `migrationsList`.
        path: "./src/db/migrations",
        migrationsList: createMigrationsList(path.resolve(__dirname, "migrations")),
        disableForeignKeys: false,
        dropTables: false,
        snapshot: false,
    },
});
