import { previewParams } from "@comet/cms-site";
import { getHost, getSiteConfigForScope, getSiteConfigs } from "@src/config";
import { Rewrite } from "next/dist/lib/load-custom-routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ContentScope } from "../../site-configs.d";
import { createRedirects } from "./redirects/redirects";

function createRewriteUrl(request: NextRequest, domain: string) {
    return new URL(
        `/${domain}${request.nextUrl.pathname}${
            request.nextUrl.searchParams.toString().length > 0 ? `?${request.nextUrl.searchParams.toString()}` : ""
        }`,
        request.url,
    );
}

export async function middleware(request: NextRequest) {
    const headers = request.headers;
    const host = getHost(headers);
    const { pathname } = new URL(request.url);

    // Block-Preview
    if (request.nextUrl.pathname.startsWith("/block-preview/")) {
        return NextResponse.next({ request: { headers } });
    }

    const siteConfig = getSiteConfigs().find((siteConfig) => siteConfig.domains.main === host || siteConfig.domains.preliminary === host);
    if (!siteConfig) {
        // Redirect to Main Host
        const redirectSiteConfig = getSiteConfigs().find(
            (siteConfig) =>
                siteConfig.domains.additional?.includes(host) || (siteConfig.domains.pattern && host.match(new RegExp(siteConfig.domains.pattern))),
        );
        if (redirectSiteConfig) {
            return NextResponse.redirect(redirectSiteConfig.url);
        }

        // Site-Preview
        const sitePreviewParams = await previewParams({ skipDraftModeCheck: true });

        if (sitePreviewParams?.scope) {
            const siteConfig = getSiteConfigForScope(sitePreviewParams.scope as ContentScope);
            headers.set("x-forwarded-host", siteConfig.domains.main);
            return NextResponse.rewrite(createRewriteUrl(request, siteConfig.domain), { request: { headers } });
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

    return NextResponse.rewrite(createRewriteUrl(request, siteConfig.domain), { request: { headers } });
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
        "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|favicon.png|manifest.json|.*\\..*).*)",
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
