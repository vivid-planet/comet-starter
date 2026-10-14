import "server-only";

import { AsyncLocalStorage } from "node:async_hooks";

import type { VisibilityParam } from "@src/util/visibility";

type RequestContext = {
    request: Request;
    cookies: Map<string, string>;
    visibility: VisibilityParam;
};

const requestContextStorage = new AsyncLocalStorage<RequestContext>();

function parseCookies(cookieHeader: string | null) {
    const cookies = new Map<string, string>();
    for (const part of (cookieHeader ?? "").split(";")) {
        const separatorIndex = part.indexOf("=");
        if (separatorIndex === -1) {
            continue;
        }
        const name = part.slice(0, separatorIndex).trim();
        const value = part.slice(separatorIndex + 1).trim();
        if (name && !cookies.has(name)) {
            cookies.set(name, decodeURIComponent(value));
        }
    }
    return cookies;
}

/**
 * Runs `fn` with a request scoped context. Everything called (synchronously or asynchronously) from `fn`, including
 * middlewares, route handlers and server components rendered during this request, can access the request via `headers()` and `cookies()`.
 */
export function runWithRequestContext<T>(request: Request, fn: () => T): T {
    return requestContextStorage.run({ request, cookies: parseCookies(request.headers.get("cookie")), visibility: "default" }, fn);
}

function getRequestContext() {
    const context = requestContextStorage.getStore();
    if (!context) {
        throw new Error("Request context is only available during a request (middleware, route handler or server component rendering)");
    }
    return context;
}

export function headers(): Headers {
    return getRequestContext().request.headers;
}

export function cookies() {
    const { cookies } = getRequestContext();
    return {
        get: (name: string) => cookies.get(name),
        has: (name: string) => cookies.has(name),
    };
}

export function setVisibility(visibility: VisibilityParam) {
    getRequestContext().visibility = visibility;
}

/**
 * Visibility of the current request: "default" for public requests, "invisiblePages"/"invisibleBlocks" when rendered in the Dextinity site preview.
 */
export function getVisibility(): VisibilityParam {
    return requestContextStorage.getStore()?.visibility ?? "default";
}
