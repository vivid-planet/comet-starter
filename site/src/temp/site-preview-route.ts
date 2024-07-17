// Temporary copy from

import { GraphQLFetch } from "@comet/cms-site";
import { SignJWT } from "jose";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Scope = Record<string, any>;

export type SitePreviewData = {
    includeInvisible: boolean;
};
export type SitePreviewParams = {
    scope: Scope;
    previewData?: SitePreviewData;
};

function getPreviewScopeSigningKey() {
    if (!process.env.SITE_PREVIEW_SECRET && process.env.NODE_ENV === "production") {
        throw new Error("SITE_PREVIEW_SECRET environment variable is required in production mode");
    }
    return process.env.SITE_PREVIEW_SECRET || "secret";
}

export async function sitePreviewRoute(request: NextRequest, graphQLFetch: GraphQLFetch, options?: { apiRoutePostfix?: string }) {
    const previewScopeSigningKey = getPreviewScopeSigningKey();
    const params = request.nextUrl.searchParams;
    const settingsParam = params.get("settings");
    const scopeParam = params.get("scope");
    if (!settingsParam || !scopeParam) {
        throw new Error("Missing settings or scope parameter");
    }

    const previewData = JSON.parse(settingsParam);
    const scope = JSON.parse(scopeParam);

    const { currentUser } = await graphQLFetch<{ currentUser: { permissionsForScope: string[] } }, { scope: Scope }>(
        `
            query CurrentUserPermissionsForScope($scope: JSONObject!) {
                currentUser {
                    permissionsForScope(scope: $scope)
                }
            }
        `,
        { scope },
        {
            headers: {
                authorization: request.headers.get("authorization") || "",
            },
        },
    );
    if (!currentUser.permissionsForScope.includes("pageTree")) {
        return new Response("Preview is not allowed", {
            status: 403,
        });
    }

    const data: SitePreviewParams = { scope, previewData };
    const token = await new SignJWT(data).setProtectedHeader({ alg: "HS256" }).sign(new TextEncoder().encode(previewScopeSigningKey));
    cookies().set("__comet_preview", token);

    draftMode().enable();

    const apiRoutePostfix = options?.apiRoutePostfix ?? "/api/site-preview";
    const basePath = request.nextUrl.pathname.split(apiRoutePostfix)[0];

    return redirect(path.join(basePath, params.get("path") ?? "") || "/");
}
