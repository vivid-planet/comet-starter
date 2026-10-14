import type { ReactNode } from "react";

/**
 * Minimal explicit router (replacement for the Next.js App Router file conventions).
 *
 * Routes are matched in order using URLPattern (https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) path syntax,
 * e.g. "/:domain/:language/:path*".
 */

export type RouteParams = Record<string, string | undefined>;

type RouteContext = {
    request: Request;
    url: URL;
    params: RouteParams;
};

type HandlerRoute = {
    path: string;
    /** Returns a response directly (replacement for route.ts route handlers, sitemap.ts, robots.ts, ...) */
    handler: (context: RouteContext) => Response | Promise<Response>;
};

type PageRoute = {
    path: string;
    /** Returns the React Server Component tree for this route, including layouts */
    page: (context: RouteContext) => ReactNode;
    /** Rendered with status 404 when page calls notFound() (replacement for not-found.tsx) */
    notFound?: (context: RouteContext) => ReactNode;
};

export type Route = HandlerRoute | PageRoute;

type CompiledRoute = Route & { pattern: URLPattern };

export function defineRoutes(routes: Route[]): CompiledRoute[] {
    return routes.map((route) => ({ ...route, pattern: new URLPattern({ pathname: route.path }) }));
}

export function matchRoute(routes: CompiledRoute[], url: URL): { route: CompiledRoute; params: RouteParams } | undefined {
    for (const route of routes) {
        const match = route.pattern.exec({ pathname: url.pathname });
        if (match) {
            const params: RouteParams = {};
            for (const [key, value] of Object.entries(match.pathname.groups)) {
                params[key] = value !== undefined ? decodeURIComponent(value) : undefined;
            }
            return { route, params };
        }
    }
    return undefined;
}

export function isPageRoute(route: Route): route is PageRoute {
    return "page" in route;
}
