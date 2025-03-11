import { gql } from "@comet/cms-site";
import { type GQLPageTreeNodeScopeInput } from "@app/graphql.generated";
import { createGraphQLFetch } from "@app/util/createGraphQLFetch";
import { recursivelyLoadBlockData } from "@app/util/recursivelyLoadBlockData";
//import { Metadata, ResolvingMetadata } from "next";
//import { notFound } from "next/navigation";

import { PageContentBlock } from "./blocks/PageContentBlock";
import { StageBlock } from "./blocks/StageBlock";
import { type GQLPageQuery, type GQLPageQueryVariables } from "./Page.generated";
import { previewParams } from "@app/util/sitePreview";

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

type Props = { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput; request: Request };

export async function loader({ pageTreeNodeId, scope, request }: Props) {
    const preview = await previewParams(request);
    const graphQLFetch = createGraphQLFetch(preview?.previewData);

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

    [document.content, document.seo] = await Promise.all([
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

    return {
        ...props,
        pageContent: {
            ...props.pageContent,
            document,
        },
    };
}
/*
export async function generateMetadata({ pageTreeNodeId, scope }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const data = await fetchData({ pageTreeNodeId, scope });
    const document = data?.pageContent?.document;
    if (!document) {
        return {};
    }
    const siteUrl = "http://localhost:3000"; //TODO get from site config
    const canonicalUrl = document.seo.canonicalUrl || `${siteUrl}${data.pageContent.path}`;

    // TODO move into library
    return {
        title: document.seo.htmlTitle || data.pageContent.name,
        description: document.seo.metaDescription,
        openGraph: {
            title: document.seo.openGraphTitle,
            description: document.seo.openGraphDescription,
            type: "website",
            url: canonicalUrl,
            images: document.seo.openGraphImage.block?.urlTemplate
                ? generateImageUrl({ src: document.seo.openGraphImage.block?.urlTemplate, width: 1200 }, 1200 / 630)
                : undefined,
        },
        robots: {
            index: !document.seo.noIndex,
        },
        alternates: {
            canonical: canonicalUrl,
            languages: document.seo.alternativeLinks.reduce(
                (acc, link) => {
                    if (link.code && link.url) acc[link.code] = link.url;
                    return acc;
                },
                { [scope.language]: canonicalUrl } as Record<string, string>,
            ),
        },
    };
}
*/
export function Page({ pageTreeNodeId, scope, loaderData }: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput, loaderData: Awaited<ReturnType<typeof loader>> }) {
    const document = loaderData?.pageContent?.document;
    if (!document) {
        // no document attached to page
        //notFound(); //no return needed
        throw new Error("notfound");
    }
    if (document.__typename != "Page") throw new Error(`invalid document type`);

    return (
        <>
            {document.seo.structuredData && document.seo.structuredData.length > 0 && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: document.seo.structuredData }} />
            )}
            <main>
                <StageBlock data={document.stage} />
                <PageContentBlock data={document.content} />
            </main>
        </>
    );
}
