// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tracing: any;
if (process.env.TRACING_ENABLED) {
    tracing = require("./tracing");
}

import opentelemetry from "@opentelemetry/api";
import { AppModule } from "@src/app.module";
import { BootstrapConsole } from "nestjs-console";

import { createConfig } from "./config/config";

const tracer = opentelemetry.trace.getTracer("console");
const config = createConfig(process.env);
const bootstrap = new BootstrapConsole({
    module: AppModule.forRoot(config),
    useDecorators: true,
    contextOptions: {
        logger: ["error", "warn", "log"],
    },
});
bootstrap.init().then(async (app) => {
    tracer.startActiveSpan(process.argv.slice(2).join(" "), async (span) => {
        try {
            // init your app
            await app.init();
            // boot the cli
            await bootstrap.boot();
            span.end();
            await tracing?.sdk?.shutdown();
            process.exit(0);
        } catch (e) {
            console.error(e);
            span.end();
            await tracing?.sdk?.shutdown();
            process.exit(1);
        }
    });
});
