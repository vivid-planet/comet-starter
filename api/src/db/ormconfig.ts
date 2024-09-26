import { createMigrationsList, createOrmConfig } from "@comet/cms-api";
import { EntityCaseNamingStrategy } from "@mikro-orm/core";
import { createConfig } from "@src/config/config";
import path from "path";

const config = createConfig(process.env);

export const ormConfig = createOrmConfig({
    type: "postgresql",
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    dbName: config.db.database,
    driverOptions: {
        connection: { ssl: config.db.ssl ? { rejectUnauthorized: true, ca: config.db.caCert } : false },
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
