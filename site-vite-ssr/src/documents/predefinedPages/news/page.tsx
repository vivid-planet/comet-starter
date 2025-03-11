export const dynamic = "error";

import { gql } from "@comet/cms-site";
import { NewsList } from "@src/news/NewsList";
import { newsListFragment } from "@src/news/NewsList.fragment";

import { GQLNewsIndexPageQuery, GQLNewsIndexPageQueryVariables } from "./page.generated";
import { previewParams } from "@src/util/sitePreview";
import { getSiteConfigForRequest } from "@src/util/siteConfig";
import { Request, Response as ExpressResponse } from "express";
import { createGraphQLFetch } from "@src/util/createGraphQLFetch";
import { serverOnly$ } from "vite-env-only/macros";

export const loader = serverOnly$(async (request: Request, response: ExpressResponse) => {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);
    const scope = { domain: siteConfig.scope.domain, language: request.params.language };
    const graphQLFetch = createGraphQLFetch(preview?.previewData);

    const { newsList } = await graphQLFetch<GQLNewsIndexPageQuery, GQLNewsIndexPageQueryVariables>(
        gql`
            query NewsIndexPage($scope: NewsContentScopeInput!, $sort: [NewsSort!]!) {
                newsList(scope: $scope, sort: $sort) {
                    ...NewsList
                }
            }

            ${newsListFragment}
        `,
        { scope, sort: [{ field: "createdAt", direction: "DESC" }] },
    );
    return { newsList };
});

export function Page({ loaderData }: { loaderData: Awaited<ReturnType<NonNullable<typeof loader>>> }) {
    return <NewsList newsList={loaderData.newsList} />;
}
