import type { Middleware } from "@src/framework/server/middleware";

const hopByHopHeaders = ["connection", "keep-alive", "transfer-encoding", "content-encoding", "content-length"];

/**
 * Proxies DAM files (images, downloads) from the API, so they are served from the site domain.
 */
export function withDamRewriteMiddleware(middleware: Middleware): Middleware {
    return async (request) => {
        const { pathname, search } = new URL(request.url);
        if (pathname.startsWith("/dam/")) {
            const requestHeaders = new Headers();
            for (const header of ["accept", "range", "if-none-match", "if-modified-since"]) {
                const value = request.headers.get(header);
                if (value) {
                    requestHeaders.set(header, value);
                }
            }
            const apiResponse = await fetch(`${process.env.API_URL_INTERNAL}${pathname}${search}`, { headers: requestHeaders, redirect: "manual" });
            const responseHeaders = new Headers(apiResponse.headers);
            // fetch() already decoded the body
            hopByHopHeaders.forEach((header) => responseHeaders.delete(header));
            return new Response(apiResponse.body, { status: apiResponse.status, statusText: apiResponse.statusText, headers: responseHeaders });
        }
        return middleware(request);
    };
}
