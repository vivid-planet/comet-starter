import type { MiddlewareHandler } from 'astro';
import { getSiteConfigForDomain, getSiteConfigForRequest } from './util/siteConfig';
import { gql } from '@comet/cms-site';
import { memoryCache } from './middleware/cache';
import type { GQLPredefinedPagesQuery, GQLPredefinedPagesQueryVariables } from './middleware.generated';
import { predefinedPagePaths } from './documents/predefinedPages/predefinedPagePaths';
import { createGraphQLFetch } from './util/createGraphQLFetch';

async function getPredefinedPageRedirect(domain: string, pathname: string): Promise<string | undefined> {
    const pages = await fetchPredefinedPages(domain);

    const matchingPredefinedPage = pages.find((page) => pathname.startsWith(page.codePath));

    if (matchingPredefinedPage) {
        return pathname.replace(matchingPredefinedPage.codePath, matchingPredefinedPage.pageTreeNodePath);
    }

    return undefined;
}

async function getPredefinedPageRewrite(domain: string, pathname: string): Promise<string | undefined> {
    const pages = await fetchPredefinedPages(domain);

    const matchingPredefinedPage = pages.find((page) => pathname.startsWith(page.pageTreeNodePath));

    if (matchingPredefinedPage) {
        return pathname.replace(matchingPredefinedPage.pageTreeNodePath, matchingPredefinedPage.codePath);
    }

    return undefined;

}

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

const graphQLFetch = createGraphQLFetch();

async function fetchPredefinedPages(domain: string) {
    const key = `predefinedPages-${domain}`;

    return memoryCache.wrap(key, async () => {
        const pages: Array<{ codePath: string; pageTreeNodePath: string }> = [];

        for (const language of getSiteConfigForDomain(domain).scope.languages) {
            const { paginatedPageTreeNodes } = await graphQLFetch<GQLPredefinedPagesQuery, GQLPredefinedPagesQueryVariables>(predefinedPagesQuery, {
                scope: { domain: domain, language },
            });

            for (const node of paginatedPageTreeNodes.nodes) {
                if (node.document?.__typename === "PredefinedPage" && node.document.type) {
                    pages.push({
                        codePath: `/${language}${predefinedPagePaths[node.document.type]}`,
                        pageTreeNodePath: `/${language}${node.path}`,
                    });
                }
            }
        }

        return pages;
    });
}

declare global {
    namespace App {
        interface Locals {
            rewritten?: boolean;
        }
    }
}
export const onRequest: MiddlewareHandler = async (context, next) => {
    const siteConfig = await getSiteConfigForRequest(context.request);
    if (!siteConfig) {
        throw new Error(`Cannot get siteConfig`);
    }

    const { pathname } = new URL(context.request.url);

    const predefinedPageRewrite = await getPredefinedPageRewrite(siteConfig.scope.domain, pathname);
    if (predefinedPageRewrite) {
        context.locals.rewritten = true;
        return context.rewrite(predefinedPageRewrite);
    }

    if (!context.locals.rewritten) {
        const predefinedPageRedirect = await getPredefinedPageRedirect(siteConfig.scope.domain, pathname);
        if (predefinedPageRedirect) {
            return context.redirect(predefinedPageRedirect, 307);
        }    
    }


    return next();
};