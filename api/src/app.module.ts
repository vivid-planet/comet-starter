import {
    BlobStorageModule,
    BLOCKS_MODULE_TRANSFORMER_DEPENDENCIES,
    BlocksModule,
    BlocksTransformerMiddlewareFactory,
    BuildsModule,
    DamModule,
    DependenciesModule,
    FilesService,
    ImagesService,
    KubernetesModule,
    PageTreeModule,
    PageTreeService,
    RedirectsModule,
    UserPermissionsModule,
} from "@comet/cms-api";
import { ApolloDriver } from "@nestjs/apollo";
import { DynamicModule, Module } from "@nestjs/common";
import { Enhancer, GraphQLModule } from "@nestjs/graphql";
import { DbModule } from "@src/db/db.module";
import { Link } from "@src/documents/links/entities/link.entity";
import { LinksModule } from "@src/documents/links/links.module";
import { Page } from "@src/documents/pages/entities/page.entity";
import { PagesModule } from "@src/documents/pages/pages.module";
import { PageTreeNodeScope } from "@src/page-tree/dto/page-tree-node-scope";
import { PageTreeNode } from "@src/page-tree/entities/page-tree-node.entity";
import { ProductsModule } from "@src/products/products.module";
import { Request } from "express";

import { AccessControlService } from "./auth/access-control.service";
import { AuthModule } from "./auth/auth.module";
import { UserService } from "./auth/user.service";
import { Config } from "./config/config";
import { ConfigModule } from "./config/config.module";
import { MenusModule } from "./menus/menus.module";
import { StatusModule } from "./status/status.module";

@Module({})
export class AppModule {
    static forRoot(config: Config): DynamicModule {
        return {
            module: AppModule,
            imports: [
                ConfigModule.forRoot(config),
                DbModule,
                GraphQLModule.forRootAsync({
                    driver: ApolloDriver,
                    imports: [BlocksModule],
                    useFactory: (dependencies: Record<string, unknown>) => ({
                        debug: config.debug,
                        playground: config.debug,
                        autoSchemaFile: "schema.gql",
                        context: ({ req }: { req: Request }) => ({ ...req }),
                        cors: {
                            origin: config.corsAllowedOrigin,
                            methods: ["GET", "POST"],
                            credentials: false,
                            exposedHeaders: [],
                        },
                        useGlobalPrefix: true,
                        // See https://docs.nestjs.com/graphql/other-features#execute-enhancers-at-the-field-resolver-level
                        fieldResolverEnhancers: ["guards", "interceptors", "filters"] as Enhancer[],
                        buildSchemaOptions: {
                            fieldMiddleware: [BlocksTransformerMiddlewareFactory.create(dependencies)],
                        },
                    }),
                    inject: [BLOCKS_MODULE_TRANSFORMER_DEPENDENCIES],
                }),
                AuthModule,
                UserPermissionsModule.forRootAsync({
                    useFactory: (userService: UserService, accessControlService: AccessControlService) => ({
                        availablePermissions: ["products"],
                        availableContentScopes: [
                            { domain: "main", language: "de" },
                            { domain: "main", language: "en" },
                            { domain: "secondary", language: "de" },
                            { domain: "secondary", language: "en" },
                        ],
                        userService,
                        accessControlService,
                    }),
                    inject: [UserService, AccessControlService],
                    imports: [AuthModule],
                }),
                BlocksModule.forRoot({
                    imports: [PageTreeModule, DamModule],
                    useFactory: (pageTreeService: PageTreeService, filesService: FilesService, imagesService: ImagesService) => {
                        return {
                            transformerDependencies: {
                                pageTreeService,
                                filesService,
                                imagesService,
                            },
                        };
                    },
                    inject: [PageTreeService, FilesService, ImagesService],
                }),
                KubernetesModule.register({
                    helmRelease: config.helmRelease,
                }),
                BuildsModule,
                LinksModule,
                PagesModule,
                PageTreeModule.forRoot({
                    PageTreeNode: PageTreeNode,
                    Documents: [Page, Link],
                    Scope: PageTreeNodeScope,
                }),
                RedirectsModule.register(),
                BlobStorageModule.register({
                    backend: config.blob.storage,
                }),
                DamModule.register({
                    damConfig: {
                        filesBaseUrl: `${config.apiUrl}/dam/files`,
                        imagesBaseUrl: `${config.apiUrl}/dam/images`,
                        secret: config.dam.secret,
                        allowedImageSizes: config.dam.allowedImageSizes,
                        allowedAspectRatios: config.dam.allowedImageAspectRatios,
                        additionalMimeTypes: config.dam.additionalMimeTypes,
                        filesDirectory: `${config.blob.storageDirectoryPrefix}-files`,
                        cacheDirectory: `${config.blob.storageDirectoryPrefix}-cache`,
                        maxFileSize: config.dam.uploadsMaxFileSize,
                    },
                    imgproxyConfig: config.imgproxy,
                }),
                StatusModule,
                ProductsModule,
                MenusModule,
                DependenciesModule,
            ],
        };
    }
}
