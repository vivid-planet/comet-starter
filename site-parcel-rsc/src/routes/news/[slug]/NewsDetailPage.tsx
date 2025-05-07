"use server-entry";

import '../../../client';
import { gql } from "@comet/cms-site";
import { GQLNewsContentScopeInput } from "@src/graphql.generated";
import { createGraphQLFetch } from "@src/util/graphQLClient";

import { Content } from "./content";
import { fragment } from "./fragment";
import { GQLNewsDetailPageQuery, GQLNewsDetailPageQueryVariables } from "./page.generated";
import { NotFoundError } from "@src/util/rscErrors";
import { Layout } from "@src/routes/Layout";

export async function NewsDetailPage({
    domain, language, slug,
}: {
    domain: string; language: string; slug: string;
}) {
    //setVisibilityParam(visibility);
    const graphqlFetch = createGraphQLFetch();

    const data = await graphqlFetch<GQLNewsDetailPageQuery, GQLNewsDetailPageQueryVariables>(
        gql`
            query NewsDetailPage($slug: String!, $scope: NewsContentScopeInput!) {
                newsBySlug(slug: $slug, scope: $scope) {
                    id
                    ...NewsDetailPage
                }
            }
            ${fragment}
        `,
        { slug, scope: { domain: domain, language: language } as GQLNewsContentScopeInput },
    );

    if (data.newsBySlug === null) {
        throw new NotFoundError();
    }

    return <Layout domain={domain} language={language}>
        <Content news={data.newsBySlug} />
    </Layout>;
}
