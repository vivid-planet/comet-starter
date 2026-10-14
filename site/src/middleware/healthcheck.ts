import { type Middleware, MiddlewareResponse } from "@src/framework/server/middleware";

export function withHealthcheckMiddleware(middleware: Middleware): Middleware {
    return async (request) => {
        if (["/healthcheck/live", "/healthcheck/ready"].includes(new URL(request.url).pathname)) {
            return MiddlewareResponse.json({ status: "OK" }, { headers: { "cache-control": "no-store" } });
        }
        return middleware(request);
    };
}
