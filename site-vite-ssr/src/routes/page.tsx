import { gql } from "@comet/cms-site";
import { createGraphQLFetch } from '../util/createGraphQLFetch';
import { getSiteConfigForRequest } from '../util/siteConfig';
import { documentTypes } from '@src/documents';
import { type Request, type Response as ExpressResponse } from 'express';
import { previewParams } from '../util/sitePreview';
import { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables } from '../entry-server.generated';
import { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from '@src/blocks.generated';
import { GQLPageTreeNodeScope } from '@src/graphql.generated';
import { Layout, loader as layoutLoader } from "@src/layout/Layout";

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


export async function loader(request: Request, response: ExpressResponse) {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);
  
    const language = request.params.language;
    const scope = { domain: siteConfig.scope.domain, language };
    const pathname = (request.params["*"] || "/");

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
  
    const { loader: documentLoader } = documentTypes[documentType];

    if (!layoutLoader) throw new Error(); //nullable due to serverOnly$, but always defined in loader (runs on server)

    if (!preview) {
        response.setHeader("Cache-Control", "max-age=450, s-maxage=450, stale-while-revalidate");
    }
  
    return {
      documentType,
      pageTreeNodeId,
      scope,
      documentLoaderData: documentLoader ? await documentLoader({ pageTreeNodeId, scope, request }) : undefined,
      layoutLoaderData: await layoutLoader(request)
    }
  }



export function Page({ loaderData }: { loaderData: any }) {
    const PageComponent = documentTypes[loaderData.documentType].component;
    return <Layout loaderData={loaderData.layoutLoaderData}>
        <PageComponent loaderData={loaderData.documentLoaderData} />
    </Layout>;
}
