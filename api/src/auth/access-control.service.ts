import { AbstractAccessControlService, ContentScopesForUser, PermissionsForUser, User, UserPermissions } from "@comet/cms-api";
import { Inject, Injectable } from "@nestjs/common";
import { Config } from "@src/config/config";
import { CONFIG } from "@src/config/config.module";

@Injectable()
export class AccessControlService extends AbstractAccessControlService {
    constructor(@Inject(CONFIG) private readonly config: Config) {
        super();
    }

    getPermissionsForUser(user: User): PermissionsForUser {
        if (this.isAdmin(user)) {
            return UserPermissions.allPermissions;
        }

        if (this.isUser(user)) {
            return [{ permission: "pageTree" }];
        }

        return [];
    }

    getContentScopesForUser(user: User): ContentScopesForUser {
        if (this.isAdmin(user)) {
            return UserPermissions.allContentScopes;
        }

        if (this.isUser(user)) {
            return [
                { domain: "main", language: "de" },
                { domain: "secondary", language: "de" },
            ];
        }

        return [];
    }

    private isAdmin(user: User) {
        return this.config.acl.adminEmails.includes(user.email) || this.config.acl.adminEmailDomains.includes(user.email.split("@")[1]);
    }

    private isUser(user: User) {
        return this.config.acl.userEmails.includes(user.email) || this.config.acl.userEmailDomains.includes(user.email.split("@")[1]);
    }
}
