import { createGraphQLFetch } from '@app/util/createGraphQLFetch';
import { getSiteConfigForRequest } from '@app/util/siteConfig';
import { previewParams } from '@app/util/sitePreview';
import { gql } from '@comet/cms-site';
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server';
import { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables } from './$language._layout.$.generated';
import { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from '@app/blocks.generated';
import { GQLPageTreeNodeScope } from '@app/graphql.generated';
import { documentTypes } from '@app/documents';

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

export const fetchPage = createServerFn({ method: 'GET' })
  .validator((params: { language: string; path: string; }) => params)
  .handler(async (serverContext) => {
    const { data: params } = serverContext;
    const request = getWebRequest();
    if (!request) throw new Error("Web Request not found");

    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);
    
    const language = params.language;
    const scope = { domain: siteConfig.scope.domain, language };
    const pathname = "/" + params.path;
  
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
              throw redirect({
                to: destination,
              })
          }
      }
      throw notFound();
    }
  
    const documentType = documentTypeData.pageTreeNodeByPath.documentType;
    const pageTreeNodeId = documentTypeData.pageTreeNodeByPath.id;
  
    const { loader: documentLoader } = documentTypes[documentType];
  
    return {
      documentType,
      pageTreeNodeId,
      scope,
      documentLoaderData: documentLoader ? await documentLoader({ pageTreeNodeId, scope, request }) : undefined
    }
  })

export const Route = createFileRoute('/$language/_layout/$')({
    loader: (opts) => {
      //console.log("Loader: ", opts);
      console.log("Loader", opts.params);
      return fetchPage({ data: { language: opts.params.language, path: opts.params._splat || "" } });
    },
    component: RouteComponent,
})

function RouteComponent() {
  const loaderData = Route.useLoaderData();

  const { component: Component } = documentTypes[loaderData.documentType];

  const props = {
    pageTreeNodeId: loaderData.pageTreeNodeId,
    scope: loaderData.scope,
    loaderData: loaderData.documentLoaderData
  };
  return <Component {...props} />;
}
