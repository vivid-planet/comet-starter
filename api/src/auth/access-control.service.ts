import { AbstractAccessControlService, ContentScopesForUser, PermissionsForUser, User, UserPermissions } from "@comet/cms-api";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccessControlService extends AbstractAccessControlService {
    getPermissionsForUser(user: User): PermissionsForUser {
        // TODO adapt to your needs
        return UserPermissions.allPermissions;
    }
    getContentScopesForUser(user: User): ContentScopesForUser {
        // TODO adapt to your needs
        return UserPermissions.allContentScopes;
    }
}
