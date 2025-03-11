import { Layout } from "@src/layout/Layout";
import { type EntryRoutes } from "@src/routes/entryRoutes";
import { createContext, use, useCallback, useEffect, useState } from "react";

export const RouterContext = createContext<Router | null>(null);

export type Router = {
    push: (to: string) => void;
    routeData: any;
};

export function RouterProvider({ children, initialRouteData }: { children: React.ReactNode, initialRouteData: any }) {
    const [routeData, setRouteData] = useState(initialRouteData);

    const loadRouteData = useCallback(async (path: string) => {
        const newRouteData = await (await fetch("/.routedata"+path)).json();
        setRouteData((routeData: any) => {
            return {
                ...newRouteData,
                predefinedPages: routeData.predefinedPages //keep predefinedPages from initialRouteData
            };
        });
    }, []);

    const listener = useCallback(async () => {
        loadRouteData(location.pathname);
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
            loadRouteData(to);
        },
        routeData
    };

    return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

export function MainPageRoute({ entryRoutes }: { entryRoutes: EntryRoutes }) {

    const router = use(RouterContext);
    if (!router) throw new Error("Router context not found");

    const RouteComponent = entryRoutes[router.routeData.routeIndex].component;
    if (!RouteComponent) throw new Error("Route has no Component");
    return <Layout loaderData={router.routeData.layoutLoaderData}>
        <RouteComponent loaderData={router.routeData.routeLoaderData} />
    </Layout>;
}