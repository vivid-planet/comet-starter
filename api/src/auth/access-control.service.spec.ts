import { User, UserPermissions } from "@comet/cms-api";
import { Test, TestingModule } from "@nestjs/testing";
import { Config } from "@src/config/config";
import { CONFIG } from "@src/config/config.module";

import { AccessControlService } from "./access-control.service";
import { staticUsers } from "./static-users";

describe("AccessControlService", () => {
    let service: AccessControlService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccessControlService,
                {
                    provide: CONFIG,
                    useValue: {
                        acl: {
                            adminEmails: ["admin@customer.com"],
                            adminEmailDomains: ["vivid-planet.com"],
                            userEmails: ["german-editor@customer.com"],
                            userEmailDomains: [],
                        } satisfies Config["acl"],
                    },
                },
            ],
        }).compile();

        service = module.get<AccessControlService>(AccessControlService);
    });

    describe("getPermissionsForUser", () => {
        it("should return no permissions by default", () => {
            const unknownUser: User = {
                id: "b26d86a7-32bb-4c84-ab9d-d167dddd40ff",
                name: "Unknown User",
                email: "unknown@example.com",
            };

            const permissions = service.getPermissionsForUser(unknownUser);

            expect(permissions).toEqual([]);
        });

        it("should return all permissions for Vivid Planet employee", () => {
            const permissions = service.getPermissionsForUser(staticUsers.vividPlanetEmployee);

            expect(permissions).toEqual(UserPermissions.allPermissions);
        });

        it("should return all permissions for Admin", () => {
            const permissions = service.getPermissionsForUser(staticUsers.admin);

            expect(permissions).toEqual(UserPermissions.allPermissions);
        });

        it("should return pageTree permission for German editor", () => {
            const permissions = service.getPermissionsForUser(staticUsers.editor);

            expect(permissions).toEqual([{ permission: "pageTree" }]);
        });
    });

    describe("getContentScopesForUser", () => {
        it("should return no content scopes by default", () => {
            const unknownUser: User = {
                id: "b26d86a7-32bb-4c84-ab9d-d167dddd40ff",
                name: "Unknown User",
                email: "unknown@example.com",
            };

            const contentScopes = service.getContentScopesForUser(unknownUser);

            expect(contentScopes).toEqual([]);
        });

        it("should return all content scopes for Vivid Planet employee", () => {
            const contentScopes = service.getContentScopesForUser(staticUsers.vividPlanetEmployee);

            expect(contentScopes).toEqual(UserPermissions.allContentScopes);
        });

        it("should return all content scopes for Admin", () => {
            const contentScopes = service.getContentScopesForUser(staticUsers.admin);

            expect(contentScopes).toEqual(UserPermissions.allContentScopes);
        });

        it("should return German content scopes for German editor", () => {
            const contentScopes = service.getContentScopesForUser(staticUsers.editor);

            expect(contentScopes).toEqual([
                { domain: "main", language: "de" },
                { domain: "secondary", language: "de" },
            ]);
        });
    });
});
