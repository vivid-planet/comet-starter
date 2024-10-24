import "tsconfig-paths/register";

import { MikroORM } from "@mikro-orm/core";
import { NestFactory } from "@nestjs/core";
import { repl } from "@nestjs/core/repl";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { createConfig } from "./config/config";

async function bootstrap() {
    const config = createConfig(process.env);
    const appModule = AppModule.forRoot(config);
    const app = await NestFactory.create<NestExpressApplication>(appModule);
    const replServer = await repl(appModule);

    // preserve history between refreshes of the repl
    replServer.setupHistory(".nestjs_repl_history", (err) => {
        if (err) {
            console.error(err);
        }
    });

    // MikroORM setup
    const orm = app.get(MikroORM);

    // Context shortcuts
    const replContext = replServer.context;
    replContext.orm = orm;
    replContext.em = orm.em;
}
bootstrap();
