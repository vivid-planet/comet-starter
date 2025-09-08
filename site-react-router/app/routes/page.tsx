import { gql } from "cms-site";
import type { Route } from "./+types/page";
import { createGraphQLFetch } from "@app/util/createGraphQLFetch";
import type { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables } from "./page.generated";
import { documentTypes } from "@app/documents/index";
import { getSiteConfigForRequest } from "@app/util/siteConfig";
import { redirect, data } from "react-router";
import type { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from "@app/blocks.generated";
import type { GQLPageTreeNodeScope } from "@app/graphql.generated";
import { previewParams } from "@app/util/sitePreview";
import { fetchPredefinedPages } from "@app/documents/predefinedPages/predefinedPagePaths";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export const documentTypeQuery = gql`
    query DocumentType($path: String!, $scope: PageTreeNodeScopeInput!, $redirectSource: String!, $redirectScope: RedirectScopeInput!) {
        pageTreeNodeByPath(path: $path, scope: $scope) {
            id
            documentType
        }
        redirectBySource(source: $redirectSource, sourceType: path, scope: $redirectScope) {
            target
        }
    }
`;

export async function loader({ request, params }: Route.LoaderArgs) {
  const siteConfig = await getSiteConfigForRequest(request);
  if (!siteConfig) throw new Error("SiteConfig not found");
  const preview = await previewParams(request);
  
  const language = params.language;
  const scope = { domain: siteConfig.scope.domain, language };
  let pathname = "/" + (params["*"] || "");



  const predefinedPages = await fetchPredefinedPages(siteConfig.scope.domain);
  for (const page of predefinedPages) {
    if (pathname.startsWith(page.pageTreeNodePath)) {
      pathname = pathname.replace(page.pageTreeNodePath, page.codePath);
      // hier brauchen wir unseren eigenen router für die predefined pages
      // news und newsDetail gibts nicht
    }
  }

  const graphQLFetch = createGraphQLFetch(preview?.previewData);
  const documentTypeData = await graphQLFetch<GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables>(
      documentTypeQuery,
      {
          path: pathname,
          redirectScope: { domain: siteConfig.scope.domain },
          redirectSource: `${language}/${pathname}`,
          scope,
      },
      { method: "GET" }, //for request memoization
  );


  if (!documentTypeData.pageTreeNodeByPath?.documentType) {
    if (documentTypeData.redirectBySource?.target) {
        const target = documentTypeData.redirectBySource?.target as RedirectsLinkBlockData;
        let destination: string | undefined;
        if (target.block !== undefined) {
            switch (target.block.type) {
                case "internal": {
                    const internalLink = target.block.props as InternalLinkBlockData;
                    if (internalLink.targetPage) {
                        destination = `/${(internalLink.targetPage.scope as GQLPageTreeNodeScope).language}/${internalLink.targetPage.path}`;
                    }
                    break;
                }
                case "external":
                    destination = (target.block.props as ExternalLinkBlockData).targetUrl;
                    break;
            }
        }
        if (destination) {
            return redirect(destination);
        }
    }
    throw data(null, { status: 404 });
  }

  const documentType = documentTypeData.pageTreeNodeByPath.documentType;
  const pageTreeNodeId = documentTypeData.pageTreeNodeByPath.id;

  const { loader: documentLoader } = documentTypes[documentType];

  return data({
    documentType,
    pageTreeNodeId,
    scope,
    documentLoaderData: documentLoader ? await documentLoader({ pageTreeNodeId, scope, request }) : undefined
  }, {
    headers: {
      "Cache-Control": "max-age=450, s-maxage=450, stale-while-revalidate"
    }
  });
}


export default function Page({ loaderData }: Route.ComponentProps) {
  if (!loaderData) throw new Error("No loader data");
  if (!documentTypes[loaderData.documentType]) {
    throw new Error(`Invalid document type: ${loaderData.documentType}`);
  }
  const { component: Component } = documentTypes[loaderData.documentType];

  const props = {
    pageTreeNodeId: loaderData.pageTreeNodeId,
    scope: loaderData.scope,
    loaderData: loaderData.documentLoaderData
  };
  return <Component {...props} />;

}
