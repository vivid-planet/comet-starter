import { Page as NewsIndexPage, loader as newsIndexPageLoader } from "./news/page";
import { Page as NewsDetailPage, loader as newsDetailPageLoader } from "./news/detail/page";

type PredefinedPageRoutes = Record<string, { path: string, loader?: any, component: any }[]>;

export const predefinedPageRoutes: PredefinedPageRoutes = {
    News: [
        {
            path: "",
            loader: newsIndexPageLoader,
            component: NewsIndexPage,
        },
        {
            path: "/:slug",
            loader: newsDetailPageLoader,
            component: NewsDetailPage,
        },
    ]
};
