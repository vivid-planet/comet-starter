import { Rewrite } from "next/dist/lib/load-custom-routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

    if (pathname.startsWith("/dam/")) {
        return NextResponse.rewrite(new URL(`${process.env.API_URL_INTERNAL}${request.nextUrl.pathname}`));
    }

    const redirects = await createRedirects();

    const redirect = redirects.get(pathname);
    if (redirect) {
        const destination: string = redirect.destination;
        return NextResponse.redirect(new URL(destination, request.url), redirect.permanent ? 308 : 307);
    }

    const rewrites = await createRewrites();
    const rewrite = rewrites.get(pathname);
    if (rewrite) {
        return NextResponse.rewrite(new URL(rewrite.destination, request.url));
    }

    return NextResponse.rewrite(
        new URL(
            `/${siteConfig.scope.domain}${request.nextUrl.pathname}${
                request.nextUrl.searchParams.toString().length > 0 ? `?${request.nextUrl.searchParams.toString()}` : ""
            }`,
            request.url,
        ),
        { request: { headers } },
    );
}

type RewritesMap = Map<string, Rewrite>;

async function createRewrites(): Promise<RewritesMap> {
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
