import { generateImageUrl, gql } from "@comet/cms-site";
import { GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { recursivelyLoadBlockData } from "@src/util/recursivelyLoadBlockData";
//import { notFound } from "next/navigation";

import { PageContentBlock } from "./blocks/PageContentBlock";
import { StageBlock } from "./blocks/StageBlock";
import { GQLPageQuery, GQLPageQueryVariables } from "./Page.generated";

const pageQuery = gql`
    query Page($pageTreeNodeId: ID!) {
        pageContent: pageTreeNode(id: $pageTreeNodeId) {
            id
            name
            path
            document {
                __typename
                ... on Page {
                    content
                    seo
                    stage
                }
            }
        }
    }
`;

type Props = { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput };

async function fetchData({ pageTreeNodeId }: Props) {
    const graphQLFetch = createGraphQLFetch();

    const props = await graphQLFetch<GQLPageQuery, GQLPageQueryVariables>(
        pageQuery,
        {
            pageTreeNodeId,
        },
        { method: "GET" }, //for request memoization
    );

    if (!props.pageContent) throw new Error("Could not load page content");
    const document = props.pageContent.document;
    if (!document) {
        return null;
    }
    if (document.__typename != "Page") throw new Error(`invalid document type, expected Page, got ${document.__typename}`);

    return {
        ...props,
        pageContent: {
            ...props.pageContent,
            document,
        },
    };
}

export async function Page({ pageTreeNodeId, scope }: Props) {
    const graphQLFetch = createGraphQLFetch();

    const data = await fetchData({ pageTreeNodeId, scope });
    const document = data?.pageContent?.document;
    if (!document) {
        // no document attached to page
        throw new Error("Document not found");
    }
    if (document.__typename != "Page") throw new Error(`invalid document type`);
    
    [document.content, document.seo, document.stage] = await Promise.all([
        recursivelyLoadBlockData({
            blockType: "PageContent",
            blockData: document.content,
            graphQLFetch,
            fetch,
        }),
        recursivelyLoadBlockData({
            blockType: "Seo",
            blockData: document.seo,
            graphQLFetch,
            fetch,
        }),
        recursivelyLoadBlockData({
            blockType: "Stage",
            blockData: document.stage,
            graphQLFetch,
            fetch,
        }),
    ]);

    const siteUrl = "http://localhost:3000"; //TODO get from site config
    const canonicalUrl = document.seo.canonicalUrl || `${siteUrl}${data.pageContent.path}`;


    return (
        <>
            <title>{document.seo.htmlTitle || data.pageContent.name}</title>
            {/* Meta*/}
            {document.seo.metaDescription && <meta name="description" content={document.seo.metaDescription} />}

            {/* Open Graph */}
            {document.seo.openGraphTitle && <meta property="og:title" content={document.seo.openGraphTitle} />}
            {document.seo.openGraphDescription && <meta property="og:description" content={document.seo.openGraphDescription} />}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            {document.seo.openGraphImage.block?.urlTemplate && (
                <meta property="og:image" content={generateImageUrl({ src: document.seo.openGraphImage.block?.urlTemplate, width: 1200 }, 1200 / 630)} />
            )}

            {/* Structured Data */}
            {document.seo.structuredData && document.seo.structuredData.length > 0 && <script type="application/ld+json">{document.seo.structuredData}</script>}

            {/* No Index */}
            {document.seo.noIndex && <meta name="robots" content="noindex" />}

            {/* Canonical Url */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Alternate Hreflang */}
            {document.seo.alternativeLinks &&
                document.seo.alternativeLinks.map((item) => <link key={item.code} rel="alternate" hrefLang={item.code} href={item.url} />)}

            <main>
                <StageBlock data={document.stage} />
                <PageContentBlock data={document.content} />
            </main>
        </>
    );
}
