import { documentTypes } from "@src/documents";
import { routes } from "@src/routes";
import { createContext, use, useCallback, useEffect, useState } from "react";

export const RouterContext = createContext<Router | null>(null);

export type Router = {
    push: (to: string) => void;
    routeData: any;
};

export function RouterProvider({ children }: { children: React.ReactNode }) {
    const [routeData, setRouteData] = useState((window as any).COMET_ROUTE_DATA);

    const listener = useCallback(async () => {
        setRouteData(await (await fetch("/.routedata"+location.pathname)).json());
    }, []);
    useEffect(() => {
        window.addEventListener('popstate', listener);
        return () => {
            window.removeEventListener('popstate', listener);
        };
    }, [listener]);

    const router = {
        push: async (to: string) => {
            window.history.pushState({}, "", to);
            setRouteData(await (await fetch("/.routedata"+to)).json());
        },
        routeData
    };

    return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

export function MainPageRoute() {

    const router = use(RouterContext);
    if (!router) throw new Error("Router context not found");

    const RouteComponent = routes[router.routeData.route].component;
    return <RouteComponent loaderData={router.routeData.data} />
}