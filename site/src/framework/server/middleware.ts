/**
 * Minimal replacement for Next.js middleware, based on standard `Request`/`Response` objects.
 *
 * A middleware either returns a response (e.g. a redirect), or one of the special responses created by `MiddlewareResponse.next()` /
 * `MiddlewareResponse.rewrite()`, which tell the request handler to continue with route handling. Headers set on those special
 * responses (e.g. Content-Security-Policy) are applied to the final response.
 */

export type Middleware = (request: Request) => Promise<Response>;

type MiddlewareFactory = (next: Middleware) => Middleware;

const NEXT_HEADER = "x-middleware-next";
const REWRITE_HEADER = "x-middleware-rewrite";

export const MiddlewareResponse = {
    /**
     * Continue with route handling, skipping all remaining middlewares.
     */
    next(): Response {
        return new Response(null, { headers: { [NEXT_HEADER]: "1" } });
    },
    /**
     * Continue with route handling, but match routes against a different URL (the browser URL doesn't change).
     */
    rewrite(url: URL | string): Response {
        return new Response(null, { headers: { [REWRITE_HEADER]: url.toString() } });
    },
    redirect(url: URL | string, status: 301 | 302 | 307 | 308 = 307): Response {
        return new Response(null, { status, headers: { location: url.toString() } });
    },
    json(data: unknown, init?: ResponseInit): Response {
        return Response.json(data, init);
    },
};

// Responses created with Response.redirect() or returned by fetch() have immutable headers
function withMutableHeaders(response: Response) {
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers: new Headers(response.headers) });
}

/**
 * Chains multiple middlewares. Each middleware gets the next middleware in the chain passed and decides whether to call it.
 */
export function chain(factories: MiddlewareFactory[], index = 0): Middleware {
    const current = factories[index];

    if (current) {
        const next = chain(factories, index + 1);
        const middleware = current(next);
        return async (request) => withMutableHeaders(await middleware(request));
    }

    return async () => MiddlewareResponse.next();
}

type MiddlewareResult = { type: "response"; response: Response } | { type: "continue"; url: URL; headers: Headers };

export async function runMiddleware(middleware: Middleware, request: Request): Promise<MiddlewareResult> {
    const response = await middleware(request);

    const rewrite = response.headers.get(REWRITE_HEADER);
    if (rewrite || response.headers.has(NEXT_HEADER)) {
        const headers = new Headers(response.headers);
        headers.delete(REWRITE_HEADER);
        headers.delete(NEXT_HEADER);
        return { type: "continue", url: new URL(rewrite ?? request.url, request.url), headers };
    }

    return { type: "response", response };
}

export function applyHeaders(response: Response, headers: Headers): Response {
    const mutableResponse = withMutableHeaders(response);
    headers.forEach((value, key) => {
        mutableResponse.headers.set(key, value);
    });
    return mutableResponse;
}
