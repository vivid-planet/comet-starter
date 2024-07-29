import { gql } from "@comet/cms-site";
import { getHost, getSiteConfigForDomain } from "@src/config";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { MetadataRoute } from "next";
import { headers } from "next/headers";

import { GQLPrebuildPageDataListSitemapQuery, GQLPrebuildPageDataListSitemapQueryVariables } from "./sitemap.generated";

export const dynamic = "force-dynamic"; // don't generate at build time

const getUrlFromDomain = (domain: string): string => {
    return domain.includes("localhost") ? `http://${domain}` : `https://${domain}`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemap: MetadataRoute.Sitemap = [];
    const graphqlFetch = createGraphQLFetch();

    const siteConfig = getSiteConfigForDomain(getHost(headers())); // https://github.com/vercel/next.js/discussions/43179

    for (const language of siteConfig.languages) {
        const domain = siteConfig.domain;
        const scope = { domain, language };

        let totalCount = 0;
        let currentCount = 0;

        do {
            const { paginatedPageTreeNodes } = await graphqlFetch<GQLPrebuildPageDataListSitemapQuery, GQLPrebuildPageDataListSitemapQueryVariables>(
                pageDataListQuery,
                {
                    scope,
                    offset: currentCount,
                    limit: 50,
                },
            );
            totalCount = paginatedPageTreeNodes.totalCount;
            currentCount += paginatedPageTreeNodes.nodes.length;

            for (const pageTreeNode of paginatedPageTreeNodes.nodes) {
                if (pageTreeNode) {
                    const path: string = pageTreeNode.path;

                    if (path && pageTreeNode.document?.__typename === "Page") {
                        const seoBlock = pageTreeNode.document.seo;
                        if (!seoBlock.noIndex) {
                            sitemap.push({
                                url: `${getUrlFromDomain(siteConfig.domains.main)}/${scope.language}${pageTreeNode.path}`,
                                priority: Number(seoBlock.priority.replace("_", ".")),
                                changeFrequency: seoBlock.changeFrequency,
                                lastModified: pageTreeNode.document.updatedAt,
                            });
                        }
                    }
                }
            }
        } while (totalCount > currentCount);
    }

    return sitemap;
}

const pageDataListQuery = gql`
    query PrebuildPageDataListSitemap($scope: PageTreeNodeScopeInput!, $offset: Int, $limit: Int) {
        paginatedPageTreeNodes(scope: $scope, offset: $offset, limit: $limit) {
            nodes {
                id
                path
                document {
                    __typename
                    ... on Page {
                        updatedAt
                        seo
                    }
                }
            }
            totalCount
        }
    }
`;
