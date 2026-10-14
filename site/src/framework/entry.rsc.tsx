// Must be the first import, see file for details
import "./server/installAsyncLocalStorage";

import { globalNotFound, routes } from "@src/app/routes";
import { middleware } from "@src/middleware";
import { renderToReadableStream } from "@vitejs/plugin-rsc/rsc/server";
import type { ReactNode } from "react";

import { applyHeaders, runMiddleware } from "./server/middleware";
import { getNavigationDigest, parseNavigationDigest } from "./server/navigation";
import { getVisibility, runWithRequestContext } from "./server/requestContext";
import { isPageRoute, matchRoute } from "./server/router";
import { RSC_SEARCH_PARAM } from "./shared";

/**
 * The data serialized into the RSC stream on the server and deserialized in entry.ssr.tsx and entry.browser.tsx
 */
export type RscPayload = {
    root: ReactNode;
    pathname: string;
    search: string;
};

// Default revalidation time of the GraphQL fetch cache (see util/graphQLClient.ts), CDNs may cache rendered pages for the same time
const CDN_CACHE_MAX_AGE = 7.5 * 60;

// @vitejs/plugin-rsc uses the default export as request handler in development (see server.mts for production)
export default { fetch: handler };

async function handler(request: Request): Promise<Response> {
    return runWithRequestContext(request, async () => {
        try {
            const result = await runMiddleware(middleware, request);
            if (result.type === "response") {
                return result.response;
            }
            const response = await handleRoute(request, result.url);
            return applyHeaders(response, result.headers);
        } catch (error) {
            console.error("Error occurred handling", request.url, error);
            return new Response("Internal Server Error", { status: 500 });
        }
    });
}

async function handleRoute(request: Request, routeUrl: URL): Promise<Response> {
    const browserUrl = new URL(request.url);
    const isRscRequest = browserUrl.searchParams.has(RSC_SEARCH_PARAM);
    browserUrl.searchParams.delete(RSC_SEARCH_PARAM);
    routeUrl.searchParams.delete(RSC_SEARCH_PARAM);

    if (browserUrl.pathname.length > 1 && browserUrl.pathname.endsWith("/")) {
        // Remove trailing slash, same as Next.js does by default. Leading slashes are collapsed to prevent redirects to other hosts (//example.com/)
        const pathname = `/${browserUrl.pathname.replace(/^\/+|\/+$/g, "")}`;
        return new Response(null, { status: 308, headers: { location: `${pathname}${browserUrl.search}` } });
    }

    const match = matchRoute(routes, routeUrl);
    if (!match) {
        return renderPage({ root: globalNotFound(), status: 404, isRscRequest, browserUrl });
    }

    const context = { request, url: routeUrl, params: match.params };
    if (!isPageRoute(match.route)) {
        return match.route.handler(context);
    }

    const { route } = match;
    return renderPage({
        root: route.page(context),
        renderNotFound: route.notFound ? () => route.notFound?.(context) : globalNotFound,
        status: 200,
        isRscRequest,
        browserUrl,
    });
}

async function renderPage({
    root,
    renderNotFound,
    status,
    isRscRequest,
    browserUrl,
}: {
    root: ReactNode;
    renderNotFound?: () => ReactNode;
    status: number;
    isRscRequest: boolean;
    browserUrl: URL;
}): Promise<Response> {
    const payload: RscPayload = { root, pathname: browserUrl.pathname, search: browserUrl.search };
    const rscStream = renderToReadableStream<RscPayload>(payload, {
        onError(error: unknown) {
            const navigationDigest = getNavigationDigest(error);
            if (navigationDigest) {
                // Passed to entry.ssr.tsx/entry.browser.tsx as error.digest
                return navigationDigest;
            }
            console.error(error);
        },
    });

    const headers = new Headers({ "Cache-Control": getCacheControl(status) });

    if (isRscRequest) {
        // Client side navigation. Status codes of notFound()/redirect() can't be known before streaming, the browser falls back to a
        // full page load when the payload contains such an error (see entry.browser.tsx)
        headers.set("Content-Type", "text/x-component;charset=utf-8");
        return new Response(rscStream, { status, headers });
    }

    const ssrEntry = await import.meta.viteRsc.loadModule<typeof import("./entry.ssr")>("ssr", "index");
    try {
        const htmlStream = await ssrEntry.renderHtml(rscStream);
        headers.set("Content-Type", "text/html;charset=utf-8");
        return new Response(htmlStream, { status, headers });
    } catch (error) {
        const digest = getNavigationDigest(error);
        const navigationTarget = digest ? parseNavigationDigest(digest) : undefined;

        if (navigationTarget?.type === "redirect") {
            return new Response(null, { status: navigationTarget.status, headers: { location: navigationTarget.location } });
        }
        if (navigationTarget?.type === "notFound" && renderNotFound) {
            return renderPage({ root: renderNotFound(), status: 404, isRscRequest, browserUrl });
        }

        console.error("Error rendering", browserUrl.toString(), error);
        return new Response(
            import.meta.env.DEV ? `Internal Server Error\n\n${error instanceof Error ? error.stack : String(error)}` : "Internal Server Error",
            {
                status: 500,
                headers: { "Cache-Control": getCacheControl(500) },
            },
        );
    }
}

function getCacheControl(status: number) {
    if (status >= 400 || import.meta.env.DEV || getVisibility() !== "default") {
        return "private, no-cache, no-store, max-age=0, must-revalidate";
    }
    return `public, s-maxage=${CDN_CACHE_MAX_AGE}, stale-while-revalidate=${24 * 60 * 60}`;
}

if (import.meta.hot) {
    import.meta.hot.accept();
}
