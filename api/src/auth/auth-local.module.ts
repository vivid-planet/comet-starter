import { createAuthResolver, createCometAuthGuard, createStaticAuthedUserStrategy, CurrentUser } from "@comet/cms-api";
import { DynamicModule, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { Config } from "@src/config/config";

import { AccessControlService } from "./access-control.service";
import { staticUser, UserService } from "./user.service";

@Module({})
export class AuthLocalModule {
    //does currently not use config, but might be one day
    static forRoot(config: Config): DynamicModule {
        if (process.env.NODE_ENV !== "development") {
            throw new Error("AuthLocalModule must only be used in development");
        }

        return {
            module: AuthLocalModule,
            providers: [
                createStaticAuthedUserStrategy({
                    staticAuthedUser: staticUser,
                }),
                createAuthResolver({
                    currentUser: CurrentUser,
                }),
                {
                    provide: APP_GUARD,
                    useClass: createCometAuthGuard(["static-authed-user"]),
                },
                UserService,
                AccessControlService,
            ],
            exports: [UserService, AccessControlService],
        };
    }
}
