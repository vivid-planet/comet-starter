import { gql } from "@comet/cms-site";
import { type ExternalLinkBlockData, type InternalLinkBlockData } from "@src/blocks.generated";
import { type GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import { createGraphQLFetch } from "@src/util/createGraphQLFetch";
//import { notFound, redirect } from "next/navigation";
import { Request, Response as ExpressResponse } from "express";

import { type GQLLinkRedirectQuery, type GQLLinkRedirectQueryVariables } from "./Link.generated";
import { serverOnly$ } from "vite-env-only/macros";
import { previewParams } from "@src/util/sitePreview";

const linkRedirectQuery = gql`
    query LinkRedirect($id: ID!) {
        pageTreeNode(id: $id) {
            document {
                __typename
                ... on Link {
                    content
                }
            }
        }
    }
`;

export const loader = serverOnly$(async (request: Request, response: ExpressResponse) => {
    const preview = await previewParams(request);
    const graphQLFetch = createGraphQLFetch(preview?.previewData);

    const pageTreeNodeId = request.params.pageTreeNodeId;

    const { pageTreeNode } = await graphQLFetch<GQLLinkRedirectQuery, GQLLinkRedirectQueryVariables>(linkRedirectQuery, {
        id: pageTreeNodeId,
    });
    return {
        pageTreeNode
    };
});


export function Link({ loaderData }: { loaderData: Awaited<ReturnType<NonNullable<typeof loader>>> }) {
    const pageTreeNode = loaderData.pageTreeNode;
    if (pageTreeNode?.document?.__typename === "Link") {
        const content = pageTreeNode.document.content;

        if (content.block?.type === "internal") {
            const link = (content.block.props as InternalLinkBlockData).targetPage?.path;
            if (link) {
                //redirect(link);
                throw new Error("TODO redirect");
            }
        }

        if (content.block?.type === "external") {
            const link = (content.block.props as ExternalLinkBlockData).targetUrl;
            if (link) {
                //redirect(link);
                throw new Error("TODO redirect");
            }
        }
    }

    //notFound();
    throw new Error("TODO not found");
}
