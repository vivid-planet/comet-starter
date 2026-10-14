import type { PreviewData } from "@dextinity/site-react";
import { cookies, headers } from "@src/framework/server/requestContext";
import { errors, jwtVerify, SignJWT } from "jose";

/**
 * Port of the site preview handling from @dextinity/site-nextjs (`previewParams()` and `sitePreviewRoute()`), which depends on
 * Next.js' draftMode() and cookies().
 *
 * The Dextinity admin opens /site-preview?jwt=... in an iframe. The JWT is verified and stored in a cookie, which enables the
 * site preview for subsequent requests.
 */

const SITE_PREVIEW_COOKIE = "__dextinity_site_preview";

type SitePreviewParams = {
    scope: { domain: string; language?: string };
    previewData?: PreviewData;
    userId?: string;
};

function getSecret() {
    if (!process.env.SITE_PREVIEW_SECRET) {
        throw new Error("SITE_PREVIEW_SECRET environment variable is required.");
    }
    return new TextEncoder().encode(process.env.SITE_PREVIEW_SECRET);
}

async function verifyJwt<T>(jwt: string): Promise<T | null> {
    try {
        const { payload } = await jwtVerify(jwt, getSecret());
        return payload as T;
    } catch (error) {
        if (error instanceof errors.JOSEError) {
            return null;
        }
        throw error;
    }
}

/**
 * Returns the site preview params if the current request is a site preview (cookie) or a block preview (x-block-preview header).
 */
export async function getSitePreviewParams(): Promise<SitePreviewParams | null> {
    const blockPreviewJwt = headers().get("x-block-preview");
    if (blockPreviewJwt) {
        return verifyJwt<SitePreviewParams>(blockPreviewJwt);
    }

    const sitePreviewJwt = cookies().get(SITE_PREVIEW_COOKIE);
    return sitePreviewJwt ? verifyJwt<SitePreviewParams>(sitePreviewJwt) : null;
}

/**
 * Replacement for `(await draftMode()).isEnabled`
 */
export async function isSitePreviewEnabled(): Promise<boolean> {
    const sitePreviewJwt = cookies().get(SITE_PREVIEW_COOKIE);
    return sitePreviewJwt ? (await verifyJwt(sitePreviewJwt)) !== null : false;
}

export async function sitePreviewRoute(request: Request): Promise<Response> {
    const jwt = new URL(request.url).searchParams.get("jwt");
    if (!jwt) {
        return Response.json({ error: "JWT-Parameter is missing." }, { status: 400 });
    }

    const payload = await verifyJwt<SitePreviewParams & { path: string }>(jwt);
    if (!payload) {
        return Response.json({ error: "JWT-validation failed." }, { status: 400 });
    }
    if (!payload.path.startsWith("/") || payload.path.startsWith("//")) {
        return Response.json({ error: `Redirect to ${payload.path} disallowed: only relative paths are valid.` }, { status: 400 });
    }

    const cookieValue = await new SignJWT({ scope: payload.scope, previewData: payload.previewData, userId: payload.userId })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1 day")
        .sign(getSecret());

    const response = new Response(null, { status: 307, headers: { location: payload.path, "Cache-Control": "private, no-store" } });
    response.headers.append("Set-Cookie", `${SITE_PREVIEW_COOKIE}=${cookieValue}; Path=/; HttpOnly; SameSite=Lax`);
    return response;
}
