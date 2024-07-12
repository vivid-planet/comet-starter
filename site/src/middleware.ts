import { Rewrite } from "next/dist/lib/load-custom-routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getHost } from "./config";
import { createRedirects } from "./redirects/redirects";
import { getSiteConfigs } from "./siteConfigs";

export async function middleware(request: NextRequest) {
    const headers = request.headers;
    const host = getHost(headers);
    const { pathname } = new URL(request.url);
    const language = pathname.split("/")?.[1] ?? "";

    if (!language) {
        return NextResponse.redirect(new URL("/en", request.url));
    }
    headers.set("x-current-language", language);

    const domain = `${host}/${language}`;

    // Site-Preview is handled in getSiteConfigs since draftMode() is not set yet in middleware (https://github.com/vercel/next.js/issues/52080)

    // Redirect to Main Host
    const siteConfig = getSiteConfigs().find((siteConfig) => siteConfig.domains.main === domain || siteConfig.domains.preliminary === domain);
    if (!siteConfig) {
        const redirectSiteConfig = getSiteConfigs().find(
            (siteConfig) =>
                siteConfig.domains.additional?.includes(domain) ||
                (siteConfig.domains.pattern && domain.match(new RegExp(siteConfig.domains.pattern))),
        );
        if (redirectSiteConfig) {
            return NextResponse.redirect(redirectSiteConfig.url);
        }
        return; // Fallback for Site-Preview
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

    const response = NextResponse.next({ request: { headers } });

    // TODO are there any other headers that need to be set?

    return response;
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
         * - favicon.ico, favicon.svg, favicon.png
         * - manifest.json
         */
        "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|favicon.png|manifest.json).*)",
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