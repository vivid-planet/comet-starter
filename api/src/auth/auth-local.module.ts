import { createAuthResolver, createCometAuthGuard, createStaticAuthedUserStrategy, CurrentUser } from "@comet/cms-api";
import { DynamicModule, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { AccessControlService } from "./access-control.service";
import { staticUsers } from "./static-users";
import { UserService } from "./user.service";

@Module({})
export class AuthLocalModule {
    static forRoot(): DynamicModule {
        if (process.env.NODE_ENV !== "development") {
            throw new Error("AuthLocalModule must only be used in development");
        }

        return {
            module: AuthLocalModule,
            providers: [
                createStaticAuthedUserStrategy({
                    staticAuthedUser: staticUsers[0].id,
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
