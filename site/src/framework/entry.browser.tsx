import { createFromFetch, createFromReadableStream } from "@vitejs/plugin-rsc/browser";
import { Component, type PropsWithChildren, startTransition, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { rscStream } from "rsc-html-stream/client";

import { RouterProvider, setNavigateImplementation } from "./client/router";
import type { RscPayload } from "./entry.rsc";
import { RSC_SEARCH_PARAM } from "./shared";

let hasNavigatedClientSide = false;

/**
 * If rendering a payload fetched during client side navigation fails (e.g. because a server component called notFound() or redirect()),
 * fall back to a full page load. The server then responds with the correct status code or redirect.
 */
class NavigationErrorBoundary extends Component<PropsWithChildren, { error?: unknown }> {
    state: { error?: unknown } = {};

    static getDerivedStateFromError(error: unknown) {
        return { error };
    }

    componentDidCatch(error: unknown) {
        if (hasNavigatedClientSide) {
            window.location.reload();
        } else {
            console.error(error);
        }
    }

    render() {
        return this.state.error ? null : this.props.children;
    }
}

async function main() {
    // The initial RSC payload is injected into the HTML by entry.ssr.tsx
    const initialPayload = await createFromReadableStream<RscPayload>(rscStream);

    let setPayload: ((payload: RscPayload) => void) | undefined;
    let afterRender: (() => void) | undefined;

    function BrowserRoot() {
        const [payload, setPayloadState] = useState(initialPayload);

        useEffect(() => {
            setPayload = (newPayload) => startTransition(() => setPayloadState(newPayload));
        }, []);

        useEffect(() => {
            afterRender?.();
            afterRender = undefined;
        }, [payload]);

        return (
            <RouterProvider pathname={payload.pathname} search={payload.search}>
                {payload.root}
            </RouterProvider>
        );
    }

    let currentLocation = `${window.location.pathname}${window.location.search}`;
    let latestNavigation = 0;

    async function renderUrl(url: URL, onRendered?: () => void) {
        const navigation = ++latestNavigation;
        currentLocation = `${url.pathname}${url.search}`;

        const rscUrl = new URL(url);
        rscUrl.hash = "";
        rscUrl.searchParams.set(RSC_SEARCH_PARAM, "1");

        let response: Response;
        try {
            response = await fetch(rscUrl);
        } catch {
            window.location.assign(url);
            return;
        }
        if (navigation !== latestNavigation) {
            return; // superseded by a newer navigation
        }
        if (!response.ok || response.redirected || !response.headers.get("Content-Type")?.startsWith("text/x-component")) {
            // e.g. a redirect by a middleware, let the browser handle it
            window.location.assign(url);
            return;
        }

        const payload = await createFromFetch<RscPayload>(Promise.resolve(response));
        if (navigation !== latestNavigation) {
            return;
        }
        hasNavigatedClientSide = true;
        afterRender = onRendered;
        setPayload?.(payload);
    }

    window.history.scrollRestoration = "manual";

    setNavigateImplementation((href, options) => {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
            window.location.assign(url);
            return;
        }
        if (url.hash && `${url.pathname}${url.search}` === currentLocation) {
            // Anchor on the current page, no need to fetch anything
            window.location.hash = url.hash;
            return;
        }

        // Remember the scroll position of the current entry to restore it when navigating back
        window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, "");
        if (options?.replace) {
            window.history.replaceState(null, "", url);
        } else {
            window.history.pushState(null, "", url);
        }

        renderUrl(url, () => {
            const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
            if (target) {
                target.scrollIntoView();
            } else {
                window.scrollTo(0, 0);
            }
        });
    });

    window.addEventListener("popstate", (event) => {
        const url = new URL(window.location.href);
        if (`${url.pathname}${url.search}` === currentLocation) {
            return; // only the hash changed
        }
        const scrollY = typeof event.state?.scrollY === "number" ? event.state.scrollY : 0;
        renderUrl(url, () => window.scrollTo(0, scrollY));
    });

    hydrateRoot(
        document,
        <NavigationErrorBoundary>
            <BrowserRoot />
        </NavigationErrorBoundary>,
    );

    if (import.meta.hot) {
        // Re-render server components when server code changes
        import.meta.hot.on("rsc:update", () => {
            renderUrl(new URL(window.location.href));
        });
    }
}

main();
