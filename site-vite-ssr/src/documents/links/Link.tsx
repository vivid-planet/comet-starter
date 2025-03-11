import { gql } from "@comet/cms-site";
import { type ExternalLinkBlockData, type InternalLinkBlockData } from "@src/blocks.generated";
import { type GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import { createGraphQLFetch } from "@src/util/createGraphQLFetch";
//import { notFound, redirect } from "next/navigation";
import { Request } from "express";

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

interface Props {
    pageTreeNodeId: string;
    scope: GQLPageTreeNodeScopeInput;
    request: Request;
}
export const loader = serverOnly$(async ({ pageTreeNodeId, scope, request }: Props) => {
    const preview = await previewParams(request);
    const graphQLFetch = createGraphQLFetch(preview?.previewData);

    const { pageTreeNode } = await graphQLFetch<GQLLinkRedirectQuery, GQLLinkRedirectQueryVariables>(linkRedirectQuery, {
        id: pageTreeNodeId,
    });
    return {
        pageTreeNode
    };
});


export async function Link({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
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
