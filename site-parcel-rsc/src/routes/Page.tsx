"use server-entry";

import { documentTypes } from '@src/documents';
import '../client';
import { Layout } from './Layout';
import { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from '@src/blocks.generated';
import { GQLPageTreeNodeScope, GQLPageTreeNodeScopeInput } from '@src/graphql.generated';
import { getSiteConfigForDomain } from '@src/util/siteConfig';
import { createGraphQLFetch } from '@src/util/graphQLClient';
import { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables } from './Page.generated';
import { gql } from '@comet/cms-site';
import { NotFoundError, RedirectError } from '@src/util/rscErrors'; 

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

async function fetchPageTreeNode(params: { path: string; domain: string; language: string }) {
    const siteConfig = getSiteConfigForDomain(params.domain);

    // Redirects are scoped by domain only, not by language.
    // If the language param isn't a valid language, it may still be the first segment of a redirect source.
    // In that case we skip resolving page and only check if the path is a redirect source.
    const skipPage = !siteConfig.scope.languages.includes(params.language);

    const path = params.path;
    const { scope } = { scope: { domain: params.domain, language: params.language } };
    const graphQLFetch = createGraphQLFetch();

    return graphQLFetch<GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables>(
        documentTypeQuery,
        {
            skipPage,
            path,
            scope,
            redirectSource: `/${params.language}${path !== "/" ? path : ""}`,
            redirectScope: { domain: scope.domain },
        },
        { method: "GET" }, //for request memoization
    );
}

interface PageProps {
    path: string;
    domain: string;
    language: string;
}

export async function Page({ path, domain, language }: PageProps) {
    //setVisibilityParam(params.visibility);

    const scope = { domain, language };
    const data = await fetchPageTreeNode({ path, domain, language });

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

    const props = {
        pageTreeNodeId,
        scope,
    };

    const { component: Component } = documentTypes[data.pageTreeNodeByPath.documentType];

    return <Layout domain={domain} language={language}>
        <Component {...props} />
    </Layout>;
}
/*
export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
    const scope = { domain: params.domain, language: params.language };
    const data = await fetchPageTreeNode(params);

    if (!data.pageTreeNodeByPath?.documentType) {
        return {};
    }

    const pageTreeNodeId = data.pageTreeNodeByPath.id;

    const props = {
        pageTreeNodeId,
        scope,
    };
    const { generateMetadata } = documentTypes[data.pageTreeNodeByPath.documentType];
    if (!generateMetadata) return {};

    return generateMetadata(props, parent);
}
*/