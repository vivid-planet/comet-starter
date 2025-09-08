import NewsIndexPage, { loader as newsIndexLoader } from "./news";
import NewsDetailPage, { loader as newsDetailLoader } from "./newsDetail";

export default [
    {
        type: "News",
        path: "/",
        loader: newsIndexLoader,
        page: NewsIndexPage
    },
    {
        type: "News",
        path: "/:slug",
        loader: newsDetailLoader,
        page: NewsDetailPage
    }
];