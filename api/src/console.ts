// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tracing: any;
if (process.env.TRACING_ENABLED === "1") {
    tracing = import("./tracing");
}

import opentelemetry from "@opentelemetry/api";
import { AppModule } from "@src/app.module";
import { CommandFactory } from "nest-commander";

import { createConfig } from "./config/config";

const tracer = opentelemetry.trace.getTracer("console");
const config = createConfig(process.env);

async function bootstrap() {
    tracer.startActiveSpan(process.argv.slice(2).join(" "), async (span) => {
        await CommandFactory.run(AppModule.forRoot(config), {
            logger: ["error", "warn", "log"],
            serviceErrorHandler: async (error) => {
                console.error(error);
                span.end();
                await (await tracing)?.sdk?.shutdown();
                process.exit(1);
            },
        });
        span.end();
        await (await tracing)?.sdk?.shutdown();
        process.exit(0);
    });
}

bootstrap();
