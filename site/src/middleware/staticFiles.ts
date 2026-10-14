import type { Middleware } from "@src/framework/server/middleware";

/**
 * Static files (public/ and the build output) are served before the request handler (by Vite in development, see server.mts in production).
 * If such a request reaches the middleware, the file doesn't exist.
 */
export function withStaticFilesMiddleware(middleware: Middleware): Middleware {
    const staticFiles = ["/favicon.ico", "/apple-icon.png", "/icon.svg", "/manifest.json"];
    const staticPaths = ["/_assets/", "/assets/"];

    return async (request) => {
        const { pathname } = new URL(request.url);
        if (staticFiles.includes(pathname) || staticPaths.some((path) => pathname.startsWith(path))) {
            return new Response("Not Found", {
                status: 404,
                headers: { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" },
            });
        }
        return middleware(request);
    };
}
