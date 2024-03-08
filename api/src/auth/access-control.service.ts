import { AbstractAccessControlService, ContentScopesForUser, PermissionsForUser, UserPermissions } from "@comet/cms-api";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccessControlService extends AbstractAccessControlService {
    getPermissionsForUser(): PermissionsForUser {
        return UserPermissions.allPermissions;
    }
    getContentScopesForUser(): ContentScopesForUser {
        return UserPermissions.allContentScopes;
    }
}
