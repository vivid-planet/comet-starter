import { AbstractAccessControlService, ContentScopesForUser, PermissionsForUser, User, UserPermissions } from "@comet/cms-api";
import { Injectable } from "@nestjs/common";

import { staticUsers } from "./static-users";

@Injectable()
export class AccessControlService extends AbstractAccessControlService {
    getPermissionsForUser(user: User): PermissionsForUser {
        if (user.email.endsWith("@vivid-planet.com")) {
            return UserPermissions.allPermissions;
        }

        if (user.email === staticUsers.admin.email) {
            return UserPermissions.allPermissions;
        }

        if (user.email === staticUsers.editor.email) {
            return [{ permission: "pageTree" }];
        }

        return [];
    }
    getContentScopesForUser(user: User): ContentScopesForUser {
        if (user.email.endsWith("@vivid-planet.com")) {
            return UserPermissions.allContentScopes;
        }

        if (user.email === staticUsers.admin.email) {
            return UserPermissions.allContentScopes;
        }

        if (user.email === staticUsers.editor.email) {
            return [
                { domain: "main", language: "de" },
                { domain: "secondary", language: "de" },
            ];
        }

        return [];
    }
}
