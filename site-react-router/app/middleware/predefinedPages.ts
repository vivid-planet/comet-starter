import { gql } from "@comet/cms-site";
import { predefinedPagePaths } from "@app/documents/predefinedPages/predefinedPagePaths";
import { getHostByHeaders, getSiteConfigForDomain, getSiteConfigForHost } from "@app/util/siteConfig";
import { type Request as ExpressRequest, type Response as ExpressResponse, type NextFunction } from "express";

import { memoryCache } from "./cache";
import { type GQLPredefinedPagesQuery, type GQLPredefinedPagesQueryVariables } from "./predefinedPages.generated";
import { createGraphQLFetch } from "@app/util/createGraphQLFetch";

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

export async function predefinedPagesMiddleware(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    console.log("predefinedPagesMiddleware");
    const host = getHostByHeaders(new Headers(req.headers as HeadersInit));
    const siteConfig = await getSiteConfigForHost(host);
    if (!siteConfig) {
        throw new Error(`Cannot get siteConfig for host ${host}`);
    }

    const predefinedPageRedirect = await getPredefinedPageRedirect(siteConfig.scope.domain, req.path);

    if (predefinedPageRedirect) {
        res.redirect(307, predefinedPageRedirect);
        return;
    }

    const predefinedPageRewrite = await getPredefinedPageRewrite(siteConfig.scope.domain, req.path);
    if (predefinedPageRewrite) {
        req.url =  predefinedPageRewrite;
        req.originalUrl =  predefinedPageRewrite;
    }

    next();
}

