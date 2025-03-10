// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tracing: any;
if (process.env.TRACING_ENABLED) {
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
        try {
            await CommandFactory.run(AppModule.forRoot(config), {
                logger: ["error", "warn", "log"],
            });
            span.end();
            await (await tracing)?.sdk?.shutdown();
            process.exit(0);
        } catch (e) {
            console.error(e);
            span.end();
            await (await tracing)?.sdk?.shutdown();
            process.exit(1);
        }
    });
}

bootstrap();
