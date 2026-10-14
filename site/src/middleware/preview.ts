import { type Middleware, MiddlewareResponse } from "@src/framework/server/middleware";
import { getHostByHeaders, getSiteConfigForHost } from "@src/util/siteConfig";

export function withPreviewMiddleware(middleware: Middleware): Middleware {
    return async (request) => {
        const { pathname } = new URL(request.url);

        // Block preview is always allowed
        if (pathname.startsWith("/block-preview/")) {
            // don't apply any other middlewares
            return MiddlewareResponse.next();
        }

        // Api url for invoking site-preview is always allowed
        if (pathname === "/site-preview") {
            // don't apply any other middlewares
            return MiddlewareResponse.next();
        }

        // Check if scope has been set via the site-preview api url
        const host = getHostByHeaders(request.headers);
        if (host === process.env.PREVIEW_DOMAIN) {
            const siteConfig = await getSiteConfigForHost(host);
            if (!siteConfig) {
                return MiddlewareResponse.json({ error: "Preview has to be called from within Dextinity Web preview" }, { status: 404 });
            }
        }

        return middleware(request);
    };
}
