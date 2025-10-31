if (process.env.TRACING_ENABLED === "1") {
    import("./tracing");
}

import { CdnGuard, ExceptionFilter, ValidationExceptionFactory } from "@comet/cms-api";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { type NestExpressApplication } from "@nestjs/platform-express";
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
        maxAge: 600,
    });

    app.useGlobalFilters(new ExceptionFilter(config.debug));
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: ValidationExceptionFactory,
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.disable("x-powered-by");

    app.use(
        helmet({
            contentSecurityPolicy:
                process.env.NODE_ENV !== "production"
                    ? false
                    : {
                          directives: {
                              "default-src": ["'none'"],
                          },
                          useDefaults: false, // Disable default directives
                      },
            xFrameOptions: false, // Disable non-standard header
            strictTransportSecurity: {
                // Enable HSTS
                maxAge: 63072000, // 2 years (recommended when subdomains are included)
                includeSubDomains: true,
                preload: true,
            },
            referrerPolicy: {
                policy: "no-referrer", // No referrer information is sent along with requests
            },
            xContentTypeOptions: true, // value="nosniff" (prevent MIME sniffing)
            xDnsPrefetchControl: false, // Disable non-standard header
            xDownloadOptions: true, // value="noopen" (prevent IE from executing downloads in the context of the site)
            xPermittedCrossDomainPolicies: true, // value="none" (prevent the browser from MIME sniffing)
            originAgentCluster: true, // value=?1
            crossOriginResourcePolicy: {
                policy: "same-site", // This allows the resource to be shared with the same site (all subdomains/ports are included)
            },
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
    const host = config.serverHost;
    await app.listen(port, host);
    logger.log(`Application is running on: http://${host}:${port}/`);
}

bootstrap();
