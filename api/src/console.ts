import { useContainer } from "class-validator";

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
const appModule = AppModule.forRoot(config);

async function bootstrap() {
    tracer.startActiveSpan(process.argv.slice(2).join(" "), async (span) => {
        const app = await CommandFactory.createWithoutRunning(appModule, {
            logger: ["error", "warn", "log"],
            serviceErrorHandler: async (error) => {
                console.error(error);
                span.end();
                await (await tracing)?.sdk?.shutdown();
                process.exit(1);
            },
        });

        try {
            await app.init();

            // class-validator should use Nest for dependency injection.
            // See https://github.com/nestjs/nest/issues/528,
            //     https://github.com/typestack/class-validator#using-service-container.
            useContainer(app.select(appModule), { fallbackOnErrors: true });

            await CommandFactory.runApplication(app);

            span.end();
            await tracing?.sdk?.shutdown();
            await app.close();
            process.exit(0);
        } catch (e) {
            console.error(e);

            span.end();
            await tracing?.sdk?.shutdown();
            await app.close();
            process.exit(1);
        }
    });
}

bootstrap();
