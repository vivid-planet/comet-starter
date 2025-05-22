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
import { PublicSiteConfig } from '@src/site-configs';

interface Props {
    slug: string;
    scope: {
        domain: string;
        language: string;    
    };
    siteConfig: PublicSiteConfig
}
export async function NewsDetailPage({ scope, slug }: Props) {

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
        { slug, scope },
    );

    if (data.newsBySlug === null) {
        throw new NotFoundError();
    }

    return <Layout scope={scope}>
        <Content news={data.newsBySlug} />
    </Layout>;
}
