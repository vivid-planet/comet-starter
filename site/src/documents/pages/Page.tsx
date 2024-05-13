import { gql, previewParams, SeoBlock } from "@comet/cms-site";
import { GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { recursivelyLoadBlockData } from "@src/util/recursivelyLoadBlockData";
import { notFound } from "next/navigation";
import * as React from "react";

import { PageContentBlock } from "./blocks/PageContentBlock";
import { GQLPageQuery, GQLPageQueryVariables } from "./Page.generated";

const pageQuery = gql`
    query Page($pageTreeNodeId: ID!) {
        pageContent: pageTreeNode(id: $pageTreeNodeId) {
            name
            document {
                __typename
                ... on Page {
                    content
                    seo
                }
            }
        }
    }
`;

export async function Page({ pageTreeNodeId }: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }) {
    const { previewData } = (await previewParams()) || { previewData: undefined };
    const graphQLFetch = createGraphQLFetch(previewData);

    const data = await graphQLFetch<GQLPageQuery, GQLPageQueryVariables>(pageQuery, {
        pageTreeNodeId,
    });

    if (!data.pageContent) throw new Error("Could not load page content");
    if (!data.pageContent.document) {
        // no document attached to page
        notFound(); //no return needed
    }
    if (data.pageContent.document?.__typename != "Page") throw new Error(`invalid document type`);

    [data.pageContent.document.content, data.pageContent.document.seo] = await Promise.all([
        recursivelyLoadBlockData({
            blockType: "PageContent",
            blockData: data.pageContent.document.content,
            graphQLFetch,
            fetch,
        }),
        recursivelyLoadBlockData({
            blockType: "Seo",
            blockData: data.pageContent.document.seo,
            graphQLFetch,
            fetch,
        }),
    ]);

    return (
        <>
            <SeoBlock data={data.pageContent.document.seo} title={data.pageContent.name} />
            <PageContentBlock data={data.pageContent.document.content} />
        </>
    );
}
