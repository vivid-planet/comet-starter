import {
    AccessLogModule,
    BlobStorageModule,
    BlocksModule,
    BlocksTransformerMiddlewareFactory,
    DamModule,
    DependenciesModule,
    PageTreeModule,
    RedirectsModule,
    UserPermissionsModule,
} from "@comet/cms-api";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DynamicModule, Module } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Enhancer, GraphQLModule } from "@nestjs/graphql";
import { DbModule } from "@src/db/db.module";
import { Link } from "@src/documents/links/entities/link.entity";
import { LinksModule } from "@src/documents/links/links.module";
import { Page } from "@src/documents/pages/entities/page.entity";
import { PagesModule } from "@src/documents/pages/pages.module";
import { PageTreeNodeScope } from "@src/page-tree/dto/page-tree-node-scope";
import { PageTreeNode } from "@src/page-tree/entities/page-tree-node.entity";
import { RedirectScope } from "@src/redirects/dto/redirect-scope";
import { ValidationError } from "apollo-server-express";
import { Request } from "express";

import { AccessControlService } from "./auth/access-control.service";
import { AuthModule, SYSTEM_USER_NAME } from "./auth/auth.module";
import { UserService } from "./auth/user.service";
import { Config } from "./config/config";
import { ConfigModule } from "./config/config.module";
import { DamFile } from "./dam/entities/dam-file.entity";
import { DamFolder } from "./dam/entities/dam-folder.entity";
import { MenusModule } from "./menus/menus.module";
import { StatusModule } from "./status/status.module";

@Module({})
export class AppModule {
    static forRoot(config: Config): DynamicModule {
        const authModule = AuthModule.forRoot(config);
        return {
            module: AppModule,
            imports: [
                ConfigModule.forRoot(config),
                DbModule,
                GraphQLModule.forRootAsync<ApolloDriverConfig>({
                    driver: ApolloDriver,
                    imports: [BlocksModule],
                    useFactory: (moduleRef: ModuleRef) => ({
                        debug: config.debug,
                        playground: config.debug,
                        // Prevents writing the schema.gql file in production. Necessary for environments with a read-only file system
                        autoSchemaFile: process.env.NODE_ENV === "development" ? "schema.gql" : true,
                        formatError: (error) => {
                            // Disable GraphQL field suggestions in production
                            if (!config.debug) {
                                if (error instanceof ValidationError) {
                                    return new ValidationError("Invalid request.");
                                }
                            }
                            return error;
                        },
                        context: ({ req }: { req: Request }) => ({ ...req }),
                        cors: {
                            origin: config.corsAllowedOrigin,
                            methods: ["GET", "POST"],
                            credentials: false,
                            maxAge: 600,
                        },
                        useGlobalPrefix: true,
                        // See https://docs.nestjs.com/graphql/other-features#execute-enhancers-at-the-field-resolver-level
                        fieldResolverEnhancers: ["guards", "interceptors", "filters"] as Enhancer[],
                        buildSchemaOptions: {
                            fieldMiddleware: [BlocksTransformerMiddlewareFactory.create(moduleRef)],
                        },
                        persistedQueries: false,
                    }),
                    inject: [ModuleRef],
                }),
                authModule,
                UserPermissionsModule.forRootAsync({
                    useFactory: (userService: UserService, accessControlService: AccessControlService) => ({
                        availableContentScopes: config.siteConfigs.flatMap((siteConfig) =>
                            siteConfig.scope.languages.map((language) => ({
                                domain: siteConfig.scope.domain,
                                language,
                            })),
                        ),
                        userService,
                        accessControlService,
                        systemUsers: [SYSTEM_USER_NAME],
                    }),
                    inject: [UserService, AccessControlService],
                    imports: [authModule],
                }),
                BlocksModule,
                LinksModule,
                PagesModule,
                PageTreeModule.forRoot({
                    PageTreeNode: PageTreeNode,
                    Documents: [Page, Link],
                    Scope: PageTreeNodeScope,
                }),
                RedirectsModule.register({ Scope: RedirectScope }),
                BlobStorageModule.register({
                    backend: config.blob.storage,
                }),
                DamModule.register({
                    File: DamFile,
                    Folder: DamFolder,
                    damConfig: {
                        apiUrl: config.apiUrl,
                        secret: config.dam.secret,
                        allowedImageSizes: config.dam.allowedImageSizes,
                        allowedAspectRatios: config.dam.allowedImageAspectRatios,
                        filesDirectory: `${config.blob.storageDirectoryPrefix}-files`,
                        cacheDirectory: `${config.blob.storageDirectoryPrefix}-cache`,
                        maxFileSize: config.dam.uploadsMaxFileSize,
                    },
                    imgproxyConfig: config.imgproxy,
                }),
                StatusModule,
                MenusModule,
                DependenciesModule,
                ...(!config.debug
                    ? [
                          AccessLogModule.forRoot({
                              shouldLogRequest: ({ user }) => {
                                  // Ignore system user
                                  if (user === SYSTEM_USER_NAME) {
                                      return false;
                                  }
                                  return true;
                              },
                          }),
                      ]
                    : []),
            ],
        };
    }
}
