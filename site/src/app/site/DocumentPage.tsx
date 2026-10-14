import { gql } from "@dextinity/site-react";
import type { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from "@src/blocks.generated";
import { documentTypes } from "@src/documents";
import { type Metadata, MetadataTags } from "@src/framework/metadata";
import { notFound, redirect } from "@src/framework/server/navigation";
import type { GQLPageTreeNodeScope } from "@src/graphql.generated";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { getSiteConfigForDomain } from "@src/util/siteConfig";

import type { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables } from "./DocumentPage.generated";

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

type Props = { domain: string; language: string; path: string[] };

async function fetchPageTreeNode({ domain, language, path: pathParam }: Props) {
    const siteConfig = getSiteConfigForDomain(domain);

    // Redirects are scoped by domain only, not by language.
    // If the language param isn't a valid language, it may still be the first segment of a redirect source.
    // In that case we skip resolving page and only check if the path is a redirect source.
    const skipPage = !siteConfig.scope.languages.includes(language);

    const path = `/${pathParam.join("/")}`;
    const { scope } = { scope: { domain, language } };
    const graphQLFetch = createGraphQLFetch();

    return graphQLFetch<GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables>(
        documentTypeQuery,
        {
            skipPage,
            path,
            scope,
            redirectSource: `/${language}${path !== "/" ? path : ""}`,
            redirectScope: { domain: scope.domain },
        },
        { method: "GET" }, //for request memoization
    );
}

export async function DocumentPage(params: Props) {
    const { domain, language } = params;
    const scope = { domain, language };
    const data = await fetchPageTreeNode(params);

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
                redirect(destination);
            }
        }
        notFound();
    }

    const pageTreeNodeId = data.pageTreeNodeByPath.id;

    const props = {
        pageTreeNodeId,
        scope,
    };

    const { component: Component } = documentTypes[data.pageTreeNodeByPath.documentType];

    return (
        <>
            <MetadataTags metadata={await generateMetadata(params)} />
            <Component {...props} />
        </>
    );
}

async function generateMetadata(params: Props): Promise<Metadata> {
    const { domain, language } = params;
    const scope = { domain, language };
    const siteConfig = getSiteConfigForDomain(domain);
    const data = await fetchPageTreeNode(params);

    const metadata: Metadata = { metadataBase: new URL(siteConfig.url) };
    if (!data.pageTreeNodeByPath?.documentType) {
        return metadata;
    }

    const pageTreeNodeId = data.pageTreeNodeByPath.id;

    const props = {
        pageTreeNodeId,
        scope,
    };
    const { generateMetadata } = documentTypes[data.pageTreeNodeByPath.documentType];
    if (!generateMetadata) {
        return metadata;
    }

    return { ...metadata, ...(await generateMetadata(props)) };
}
