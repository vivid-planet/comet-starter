export const dynamic = "error";

import { gql } from "@comet/cms-site";

import { Content } from "./content";
import { fragment } from "./fragment";
import { GQLNewsDetailPageQuery, GQLNewsDetailPageQueryVariables } from "./page.generated";
import { Request, Response as ExpressResponse } from "express";
import { getSiteConfigForRequest } from "@src/util/siteConfig";
import { previewParams } from "@src/util/sitePreview";
import { createGraphQLFetch } from "@src/util/createGraphQLFetch";
import { serverOnly$ } from "vite-env-only/macros";

export const loader = serverOnly$(async (request: Request, response: ExpressResponse) => {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);
    const scope = { domain: siteConfig.scope.domain, language: request.params.language };
    const graphQLFetch = createGraphQLFetch(preview?.previewData);

    const data = await graphQLFetch<GQLNewsDetailPageQuery, GQLNewsDetailPageQueryVariables>(
        gql`
            query NewsDetailPage($slug: String!, $scope: NewsContentScopeInput!) {
                newsBySlug(slug: $slug, scope: $scope) {
                    id
                    ...NewsDetailPage
                }
            }
            ${fragment}
        `,
        { slug: request.params.slug, scope },
    );

    if (data.newsBySlug === null) {
        throw new Response(null, { status: 404 }); //TODO Response vs express.Response
    }
    return { newsBySlug: data.newsBySlug };
});

export function Page({ loaderData }: { loaderData: Awaited<ReturnType<NonNullable<typeof loader>>> }) {
    return <Content news={loaderData.newsBySlug} />;
}
