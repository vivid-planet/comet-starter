"use server-entry";

import { documentTypes } from '@src/documents';
import '../client';
import { Layout } from './Layout';
import { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from '@src/blocks.generated';
import { GQLPageTreeNodeScope, GQLPageTreeNodeScopeInput } from '@src/graphql.generated';
import { createGraphQLFetch } from '@src/util/graphQLClient';
import { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables } from './Page.generated';
import { gql } from '@comet/cms-site';
import { NotFoundError, RedirectError } from '@src/util/rscErrors'; 
import { PublicSiteConfig } from '@src/site-configs';

const documentTypeQuery = gql`
    query DocumentType(
        $skipPage: Boolean!
        $path: String!
        $scope: PageTreeNodeScopeInput!
        $redirectSource: String!
        $redirectScope: RedirectScopeInput!
    ) {
        pageTreeNodeByPath(path: $path, scope: $scope) @skip(if: $skipPage) {
            id
            documentType
        }
        redirectBySource(source: $redirectSource, sourceType: path, scope: $redirectScope) {
            target
        }
    }
`;

async function fetchPageTreeNode(params: PageProps) {
    // Redirects are scoped by domain only, not by language.
    // If the language param isn't a valid language, it may still be the first segment of a redirect source.
    // In that case we skip resolving page and only check if the path is a redirect source.
    const skipPage = !params.siteConfig.scope.languages.includes(params.scope.language);

    const path = params.path;
    const graphQLFetch = createGraphQLFetch();

    return graphQLFetch<GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables>(
        documentTypeQuery,
        {
            skipPage,
            path,
            scope: params.scope,
            redirectSource: `/${params.scope.language}${path !== "/" ? path : ""}`,
            redirectScope: { domain: params.scope.domain },
        },
        { method: "GET" }, //for request memoization
    );
}

interface PageProps {
    path: string;
    scope: {
        domain: string;
        language: string;    
    };
    siteConfig: PublicSiteConfig
}

export async function Page(props: PageProps) {
    const data = await fetchPageTreeNode(props);

    if (!data.pageTreeNodeByPath?.documentType) {
        if (data.redirectBySource?.target) {
            const target = data.redirectBySource?.target as RedirectsLinkBlockData;
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
                throw new RedirectError(destination);
            }
        }
        throw new NotFoundError();
    }

    const pageTreeNodeId = data.pageTreeNodeByPath.id;

    const documentProps = {
        pageTreeNodeId,
        scope: props.scope,
        siteConfig: props.siteConfig
    };

    const { component: Component } = documentTypes[data.pageTreeNodeByPath.documentType];

    return <Layout scope={props.scope}>
        <Component {...documentProps} />
    </Layout>;
}
