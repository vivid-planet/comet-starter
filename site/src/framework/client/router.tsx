import { createContext, type PropsWithChildren, useContext, useMemo } from "react";

/**
 * Client side router state, replacement for `usePathname()`/`useSearchParams()` from `next/navigation`.
 *
 * The provider is rendered by entry.ssr.tsx and entry.browser.tsx around the RSC payload, so all client components can access it.
 */
type RouterState = {
    pathname: string;
    search: string;
};

const RouterContext = createContext<RouterState | null>(null);

export function RouterProvider({ pathname, search, children }: PropsWithChildren<RouterState>) {
    const value = useMemo(() => ({ pathname, search }), [pathname, search]);
    return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

function useRouterState() {
    const state = useContext(RouterContext);
    if (!state) {
        throw new Error("Router state is not available, RouterProvider missing");
    }
    return state;
}

export function usePathname() {
    return useRouterState().pathname;
}

export function useSearchParams() {
    const { search } = useRouterState();
    return useMemo(() => new URLSearchParams(search), [search]);
}

type NavigateOptions = { replace?: boolean };
type Navigate = (href: string, options?: NavigateOptions) => void;

let navigateImplementation: Navigate | undefined;

/**
 * Registered by entry.browser.tsx once the client side router is ready.
 */
export function setNavigateImplementation(navigate: Navigate) {
    navigateImplementation = navigate;
}

/**
 * Client side navigation: fetches the RSC payload of the target URL and renders it without a full page load.
 */
export function navigate(href: string, options?: NavigateOptions) {
    if (navigateImplementation) {
        navigateImplementation(href, options);
    } else {
        window.location.assign(href);
    }
}
