import { type Middleware, MiddlewareResponse } from "@src/framework/server/middleware";

export function withRobotsMiddleware(middleware: Middleware): Middleware {
    return async (request) => {
        if (new URL(request.url).pathname === "/robots.txt") {
            // don't apply any other middlewares
            return MiddlewareResponse.next();
        }
        return middleware(request);
    };
}
