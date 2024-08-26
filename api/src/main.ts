if (process.env.TRACING_ENABLED) {
    require("./tracing");
}

import { CdnGuard, ExceptionInterceptor, ValidationExceptionFactory } from "@comet/cms-api";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "@src/app.module";
import { useContainer } from "class-validator";
import compression from "compression";
import cookieParser from "cookie-parser";
import { json } from "express";
import helmet from "helmet";
import { resolve } from "path";

import { createConfig } from "./config/config";

async function bootstrap(): Promise<void> {
    const logger = new Logger("bootstrap");
    const config = createConfig(process.env);
    const appModule = AppModule.forRoot(config);
    const app = await NestFactory.create<NestExpressApplication>(appModule);

    // class-validator should use Nest for dependency injection.
    // See https://github.com/nestjs/nest/issues/528,
    //     https://github.com/typestack/class-validator#using-service-container.
    useContainer(app.select(appModule), { fallbackOnErrors: true });

    app.setGlobalPrefix("api");
    app.enableCors({
        origin: config.corsAllowedOrigin,
        methods: ["GET", "POST"],
        credentials: false,
        exposedHeaders: [],
    });

    app.useGlobalInterceptors(new ExceptionInterceptor(config.debug));
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: ValidationExceptionFactory,
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.use(
        helmet({
            contentSecurityPolicy: false, // configure this when API returns HTML
        }),
    );
    app.use(json({ limit: "1mb" })); // increase default limit of 100kb for saving large pages
    app.use(compression());
    app.use(cookieParser());

    // If CDN is enabled, make sure all traffic is either coming from the CDN or internal sources
    if (config.cdn.originCheckSecret) {
        app.useGlobalGuards(new CdnGuard({ headerName: "x-cdn-origin-check", headerValue: config.cdn.originCheckSecret }));
    }

    app.useStaticAssets(resolve(__dirname, "../public"));

    // https://mikro-orm.io/docs/usage-with-nestjs#app-shutdown-and-cleanup
    app.enableShutdownHooks();

    const port = config.apiPort;
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}/`);
}

bootstrap();
