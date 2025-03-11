import { gql } from "@comet/cms-site";
import { createGraphQLFetch } from '../util/createGraphQLFetch';
import { getSiteConfigForRequest } from '../util/siteConfig';
import { documentTypes } from '@src/documents';
import { type Request, type Response as ExpressResponse } from 'express';
import { previewParams } from '../util/sitePreview';
import { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables } from '../entry-server.generated';
import { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from '@src/blocks.generated';
import { GQLPageTreeNodeScope } from '@src/graphql.generated';
import { serverOnly$ } from "vite-env-only/macros";

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

export const pageTreePageLoader = serverOnly$(async (request: Request, response: ExpressResponse) => {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);

    const language = request.params.language;
    const scope = { domain: siteConfig.scope.domain, language };
    const pathname = (request.params["splat"] || "/");
   
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
              throw new Response(null, { headers: { Location: destination } }); //TODO Response vs express.Response
          }
      }
      throw new Response(null, { status: 404 }); //TODO Response vs express.Response
    }
  
    const documentType = documentTypeData.pageTreeNodeByPath.documentType;
    const pageTreeNodeId = documentTypeData.pageTreeNodeByPath.id;
    request.params.pageTreeNodeId = pageTreeNodeId;
  
    const { loader: documentLoader } = documentTypes[documentType];
 
    return {
      documentType,
      documentLoaderData: documentLoader ? await documentLoader(request, response) : undefined,
    }
});


export function Page({ loaderData }: { loaderData: Awaited<ReturnType<NonNullable<typeof pageTreePageLoader>>> }) {
    const PageComponent = documentTypes[loaderData.documentType].component
    return <PageComponent loaderData={loaderData.documentLoaderData} />
}
