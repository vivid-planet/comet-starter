import { setVisibility } from "@src/framework/server/requestContext";
import { defineRoutes, type RouteParams } from "@src/framework/server/router";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { sitePreviewRoute } from "@src/util/sitePreview";
import { isVisibilityParam } from "@src/util/visibility";

import { BlockPreviewLayout } from "./block-preview/BlockPreviewLayout";
import { FooterBlockPreview } from "./block-preview/FooterBlockPreview";
import { PageBlockPreview } from "./block-preview/PageBlockPreview";
import { StageBlockPreview } from "./block-preview/StageBlockPreview";
import { GlobalNotFound } from "./GlobalNotFound";
import { robots } from "./robots";
import { RootLayout } from "./RootLayout";
import { DocumentPage } from "./site/DocumentPage";
import { graphql } from "./site/graphql";
import { LanguageLayout, resolveLanguage } from "./site/LanguageLayout";
import { NotFoundPage } from "./site/NotFoundPage";
import { SiteLayout } from "./site/SiteLayout";
import { sitemap } from "./site/sitemap";

/**
 * Params of routes below /:visibility/:domain/, the middleware (see middleware/domainRewrite.ts) prefixes all paths with them.
 */
function getSiteParams(params: RouteParams) {
    const { visibility = "", domain = "" } = params;
    if (!isVisibilityParam(visibility)) {
        throw new Error(`Invalid visibility param ${visibility}`);
    }
    setVisibility(visibility);
    return { domain };
}

const blockPreviews = {
    page: PageBlockPreview,
    footer: FooterBlockPreview,
    stage: StageBlockPreview,
};

export const routes = defineRoutes([
    { path: "/robots.txt", handler: () => robots() },
    { path: "/site-preview", handler: ({ request }) => sitePreviewRoute(request) },
    {
        path: "/block-preview/:domain/:language/:type(page|footer|stage)",
        page: ({ params }) => {
            const { domain = "", language = "", type } = params;
            const BlockPreview = blockPreviews[type as keyof typeof blockPreviews];
            return (
                <RootLayout>
                    <BlockPreviewLayout domain={domain} language={language}>
                        <BlockPreview />
                    </BlockPreviewLayout>
                </RootLayout>
            );
        },
    },
    {
        path: "/:visibility/:domain/graphql",
        handler: ({ request }) => graphql(request),
    },
    {
        path: "/:visibility/:domain/sitemap.xml",
        handler: ({ params }) => sitemap(getSiteParams(params).domain),
    },
    {
        path: "/:visibility/:domain",
        handler: () => new Response(null, { status: 307, headers: { location: "/en" } }),
    },
    {
        path: "/:visibility/:domain/:language/:path*",
        page: ({ params }) => {
            const { domain } = getSiteParams(params);
            const { language = "", path } = params;
            return (
                <RootLayout>
                    <SiteLayout domain={domain}>
                        <LanguageLayout domain={domain} language={language}>
                            <DocumentPage domain={domain} language={language} path={path ? path.split("/") : []} />
                        </LanguageLayout>
                    </SiteLayout>
                </RootLayout>
            );
        },
        notFound: ({ params }) => {
            const { domain } = getSiteParams(params);
            const language = resolveLanguage(getSiteConfigForDomain(domain), params.language ?? "");
            return (
                <RootLayout>
                    <SiteLayout domain={domain}>
                        <LanguageLayout domain={domain} language={language}>
                            <NotFoundPage domain={domain} language={language} />
                        </LanguageLayout>
                    </SiteLayout>
                </RootLayout>
            );
        },
    },
]);

export function globalNotFound() {
    return <GlobalNotFound />;
}
