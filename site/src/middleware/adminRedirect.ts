import { type Middleware, MiddlewareResponse } from "@src/framework/server/middleware";
import { getHostByHeaders, getSiteConfigForHost } from "@src/util/siteConfig";

export function withAdminRedirectMiddleware(middleware: Middleware): Middleware {
    return async (request) => {
        if (new URL(request.url).pathname === "/admin" && process.env.ADMIN_URL) {
            const host = getHostByHeaders(request.headers);
            const siteConfig = await getSiteConfigForHost(host);
            if (siteConfig) {
                const { domain, languages } = siteConfig.scope;
                const language = languages[0];
                return MiddlewareResponse.redirect(new URL(`/${domain}/${language}`, process.env.ADMIN_URL));
            }
            return MiddlewareResponse.redirect(new URL(process.env.ADMIN_URL));
        }
        return middleware(request);
    };
}
