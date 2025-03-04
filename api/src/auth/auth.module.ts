import {
    AuthServiceInterface,
    CometAuthGuard,
    createAuthGuardProviders,
    createAuthResolver,
    createBasicAuthService,
    createJwtAuthService,
    createStaticUserAuthService,
} from "@comet/cms-api";
import { DynamicModule, Module, Provider, type Type } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { Config } from "@src/config/config";

import { AccessControlService } from "./access-control.service";
import { staticUsers } from "./static-users";
import { UserService } from "./user.service";

export const SYSTEM_USER_NAME = "system-user";

@Module({})
export class AuthModule {
    static forRoot(config: Config): DynamicModule {
        const authServices: Type<AuthServiceInterface>[] = [
            createBasicAuthService({
                username: SYSTEM_USER_NAME,
                password: config.auth.systemUserPassword,
            }),
        ];

        const providers: Provider[] = [
            createAuthResolver({
                postLogoutRedirectUri: config.auth.postLogoutRedirectUri,
                endSessionEndpoint: config.auth.idpEndSessionEndpoint,
            }),
            AccessControlService,
            UserService,
        ];

        if (config.auth.useAuthProxy) {
            authServices.push(
                createJwtAuthService({ verifyOptions: { audience: config.auth.idpClientId }, jwksOptions: { jwksUri: config.auth.idpJwksUri } }),
            );
            providers.push({
                provide: APP_GUARD,
                useClass: CometAuthGuard,
            });
        } else {
            if (process.env.NODE_ENV !== "development") {
                throw new Error("config.auth.useAuthproxy must only be false in development");
            }
            authServices.push(
                createStaticUserAuthService({
                    staticUser: staticUsers.vividPlanetEmployee.id,
                }),
            );
            providers.push({
                provide: APP_GUARD,
                useClass: CometAuthGuard,
            });
        }

        providers.push(...createAuthGuardProviders(...authServices));

        return {
            module: AuthModule,
            providers,
            exports: [AccessControlService, UserService],
            imports: [JwtModule],
        };
    }
}
