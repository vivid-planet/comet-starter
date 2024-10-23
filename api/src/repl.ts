import "tsconfig-paths/register";

import { MikroORM } from "@mikro-orm/core";
import { repl } from "@nestjs/core/repl";

import { AppModule } from "./app.module";
import { ormConfig } from "./db/ormconfig";

async function bootstrap() {
    const replServer = await repl(AppModule);

    // preserve history between refreshes of the repl
    replServer.setupHistory(".nestjs_repl_history", (err) => {
        if (err) {
            console.error(err);
        }
    });

    // MikroORM setup
    const orm = await MikroORM.init({
        ...ormConfig,
        debug: true,
        allowGlobalContext: true,
        entities: ["./dist/**/entities/*entity.js"],
        entitiesTs: ["/**/entities/*.entity.ts"],
    });

    // Context shortcuts
    const replContext = replServer.context;
    replContext.orm = orm;
    replContext.em = orm.em;
}
bootstrap();
