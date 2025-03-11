export const dynamic = "error";

import { gql } from "@comet/cms-site";
import type { Route } from "./+types/newsDetail";
import { data } from "react-router";

import { type GQLNewsDetailPageFragment, type GQLNewsDetailPageQuery, type GQLNewsDetailPageQueryVariables } from "./newsDetail.generated";
import { DamImageBlock } from "@app/common/blocks/DamImageBlock";
import { FormattedDate } from "react-intl";
import { NewsContentBlock } from "@app/news/blocks/NewsContentBlock";
import { getSiteConfigForRequest } from "@app/util/siteConfig";
import { previewParams } from "@app/util/sitePreview";
import { createGraphQLFetch } from "@app/util/createGraphQLFetch";

export const fragment = gql`
    fragment NewsDetailPage on News {
        title
        image
        createdAt
        content
    }
`;

type ContentProps = {
    news: GQLNewsDetailPageFragment;
};
function Content({ news }: ContentProps) {
    return (
        <div>
            <DamImageBlock data={news.image} aspectRatio="16x9" />
            <h1>{news.title}</h1>
            <p>
                <FormattedDate value={news.createdAt} />
            </p>
            <hr />
            <NewsContentBlock data={news.content} />
        </div>
    );
}

export async function loader({ request, params }: Route.LoaderArgs) {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);
    
    const language = params.language;
    const scope = { domain: siteConfig.scope.domain, language };

    const graphQLFetch = createGraphQLFetch(preview?.previewData);

    const fetchedData = await graphQLFetch<GQLNewsDetailPageQuery, GQLNewsDetailPageQueryVariables>(
        gql`
            query NewsDetailPage($slug: String!, $scope: NewsContentScopeInput!) {
                newsBySlug(slug: $slug, scope: $scope) {
                    id
                    ...NewsDetailPage
                }
            }
            ${fragment}
        `,
        { slug: params.slug, scope },
    );
    if (fetchedData.newsBySlug === null) {
        throw data(null, { status: 404 });
    }
    return { newsBySlug: fetchedData.newsBySlug };
};

export default async function NewsDetailPage({ loaderData }: Route.ComponentProps) {

    return <Content news={loaderData.newsBySlug} />;
}
