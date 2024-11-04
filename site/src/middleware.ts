import { Rewrite } from "next/dist/lib/load-custom-routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { GQLRedirectScope } from "./graphql.generated";
import { createRedirects } from "./redirects/redirects";
import { getHostByHeaders, getSiteConfigForHost, getSiteConfigs } from "./util/siteConfig";

export async function middleware(request: NextRequest) {
    const headers = request.headers;
    const host = getHostByHeaders(headers);
    const { pathname } = new URL(request.url);

    // Block-Preview
    if (request.nextUrl.pathname.startsWith("/block-preview/")) {
        return NextResponse.next({ request: { headers } });
    }

    const siteConfig = await getSiteConfigForHost(host);
    if (!siteConfig) {
        // Redirect to Main Host
        const redirectSiteConfig = getSiteConfigs().find(
            (siteConfig) =>
                siteConfig.domains.additional?.includes(host) || (siteConfig.domains.pattern && host.match(new RegExp(siteConfig.domains.pattern))),
        );
        if (redirectSiteConfig) {
            return NextResponse.redirect(redirectSiteConfig.url);
        }

        throw new Error(`Cannot get siteConfig for host ${host}`);
    }

    const scope = { domain: siteConfig.scope.domain };

    if (pathname.startsWith("/dam/")) {
        return NextResponse.rewrite(new URL(`${process.env.API_URL_INTERNAL}${request.nextUrl.pathname}`));
    }

    const redirects = await createRedirects(scope);

    const redirect = redirects.get(pathname);
    if (redirect) {
        const destination: string = redirect.destination;
        return NextResponse.redirect(new URL(destination, request.url), redirect.permanent ? 308 : 307);
    }

    const rewrites = await createRewrites(scope);
    const rewrite = rewrites.get(pathname);
    if (rewrite) {
        return NextResponse.rewrite(new URL(rewrite.destination, request.url));
    }

    const response = NextResponse.rewrite(
        new URL(
            `/${siteConfig.scope.domain}${request.nextUrl.pathname}${
                request.nextUrl.searchParams.toString().length > 0 ? `?${request.nextUrl.searchParams.toString()}` : ""
            }`,
            request.url,
        ),
        { request: { headers } },
    );

    response.headers.set(
        "Content-Security-Policy",
        `
            default-src 'self';
            form-action 'self'; 
            object-src 'none';
            img-src 'self' https: data:${process.env.NODE_ENV === "development" ? " http:" : ""};
            media-src 'self' https: data:${process.env.NODE_ENV === "development" ? " http:" : ""};
            style-src 'self' 'unsafe-inline'; 
            font-src 'self' https: data:;
            script-src 'self' 'unsafe-inline' https:${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""};
            connect-src 'self' https:${process.env.NODE_ENV === "development" ? " http:" : ""};
            frame-ancestors ${process.env.ADMIN_URL};
            upgrade-insecure-requests; 
            block-all-mixed-content;
            frame-src 'self' https://*.youtube.com https://*.youtube-nocookie.com;
        `
            .replace(/\s{2,}/g, " ")
            .trim(),
    );
    if (process.env.ADMIN_URL) {
        response.headers.set("Access-Control-Allow-Origin", process.env.ADMIN_URL);
    }

    return response;
}

type RewritesMap = Map<string, Rewrite>;

async function createRewrites(scope: GQLRedirectScope): Promise<RewritesMap> {
    const rewritesMap = new Map<string, Rewrite>();
    return rewritesMap;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, icon.svg, apple-icon.png
         * - manifest.json
         * - assets (assets from /public folder)
         * - robots.txt
         */
        "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest.json|assets|robots.txt).*)",
    ],
    // TODO find a better solution for this (https://nextjs.org/docs/messages/edge-dynamic-code-evaluation)
    unstable_allowDynamic: [
        "/node_modules/graphql/**",
        /*
         * cache-manager uses lodash.clonedeep which uses dynamic code evaluation.
         * See https://github.com/lodash/lodash/issues/5525.
         */
        "/node_modules/lodash.clonedeep/**",
    ],
};
