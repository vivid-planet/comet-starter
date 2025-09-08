import { createGraphQLFetch } from "@app/util/createGraphQLFetch";
import { gql } from "@comet/cms-site";
import { createCache, memoryStore } from "cache-manager";
import type { GQLPredefinedPagesQuery, GQLPredefinedPagesQueryVariables } from "./predefinedPagePaths.generated";
import { getSiteConfigForDomain } from "@app/util/siteConfig";

export const memoryCache = createCache(
    memoryStore({
        ttl: 15 * 60 * 1000, // 15 minutes,
    }),
    {
        refreshThreshold: 5 * 60 * 1000, // refresh if less than 5 minutes TTL are remaining,
        onBackgroundRefreshError: (error) => {
            console.error("Error refreshing cache in background", error);
        },
    },
);


const predefinedPagesQuery = gql`
    query PredefinedPages($scope: PageTreeNodeScopeInput!) {
        paginatedPageTreeNodes(scope: $scope, documentType: "PredefinedPage") {
            nodes {
                id
                path
                document {
                    __typename
                    ... on PredefinedPage {
                        type
                    }
                }
            }
        }
    }
`;

export async function fetchPredefinedPages(domain: string) {
    const key = `predefinedPages-${domain}`;

    return memoryCache.wrap(key, async () => {
        const pages: Array<{ pageTreeNodePath: string }> = [];

        const graphQLFetch = createGraphQLFetch();

        for (const language of getSiteConfigForDomain(domain).scope.languages) {
            const { paginatedPageTreeNodes } = await graphQLFetch<GQLPredefinedPagesQuery, GQLPredefinedPagesQueryVariables>(predefinedPagesQuery, {
                scope: { domain: domain, language },
            });

            for (const node of paginatedPageTreeNodes.nodes) {
                if (node.document?.__typename === "PredefinedPage" && node.document.type) {
                    pages.push({
                        pageTreeNodePath: `/${language}${node.path}`,
                    });
                }
            }
        }

        return pages;
    });
}