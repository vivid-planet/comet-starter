import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    route(":language", "routes/layout.tsx", [
        route("news", "routes/news.tsx"), 
        route("news/:slug", "routes/newsDetail.tsx"),
        index("routes/page.tsx", { id: "index"}),
        route("*", "routes/page.tsx")
    ]),
    route("site-preview", "routes/sitePreview.tsx"),
    route("block-preview/:domain/:language/:type", "routes/blockPreview.tsx"),
    route("robots.txt", "routes/robots.txt.ts"),
    route("sitemap.xml", "routes/sitemap.xml.ts"),
] satisfies RouteConfig;
