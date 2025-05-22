"use server-entry";

import '../../client';
import { gql } from "@comet/cms-site";
import { GQLNewsContentScopeInput } from "@src/graphql.generated";
import { NewsList } from "@src/news/NewsList";
import { newsListFragment } from "@src/news/NewsList.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";

import { GQLNewsIndexPageQuery, GQLNewsIndexPageQueryVariables } from "./page.generated";
import { Layout } from "../Layout";
import { PublicSiteConfig } from '@src/site-configs';


interface Props {
    scope: {
        domain: string;
        language: string;    
    };
    siteConfig: PublicSiteConfig
}
export async function NewsIndexPage({ scope }: Props) {
    const graphqlFetch = createGraphQLFetch();

    const { newsList } = await graphqlFetch<GQLNewsIndexPageQuery, GQLNewsIndexPageQueryVariables>(
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

    return <Layout scope={scope}>
        <NewsList newsList={newsList} />
    </Layout>;
}
