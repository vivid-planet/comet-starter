import { NewsList } from "@app/news/NewsList";
import type { Route } from "./+types/news";
import { newsListFragment } from "@app/news/NewsList.fragment";
import { getSiteConfigForRequest } from "@app/util/siteConfig";
import { previewParams } from "@app/util/sitePreview";
import { createGraphQLFetch } from "@app/util/createGraphQLFetch";
import type { GQLNewsIndexPageQuery, GQLNewsIndexPageQueryVariables } from "./news.generated";
import { gql } from "@comet/cms-site";

export async function loader({ request, params }: Route.LoaderArgs) {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);
    
    const language = params.language;
    const scope = { domain: siteConfig.scope.domain, language };

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
}

export default async function NewsIndexPage({ loaderData }: Route.ComponentProps) {
    return <NewsList newsList={loaderData.newsList} />;
}
