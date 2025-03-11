import { gql } from "@comet/cms-site";
import { type ExternalLinkBlockData, type InternalLinkBlockData } from "@app/blocks.generated";
import { type GQLPageTreeNodeScopeInput } from "@app/graphql.generated";
import { createGraphQLFetch } from "@app/util/createGraphQLFetch";
//import { notFound, redirect } from "next/navigation";

import { type GQLLinkRedirectQuery, type GQLLinkRedirectQueryVariables } from "./Link.generated";

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

export async function Link({ pageTreeNodeId }: Props) {
    const graphqlFetch = createGraphQLFetch();

    const { pageTreeNode } = await graphqlFetch<GQLLinkRedirectQuery, GQLLinkRedirectQueryVariables>(linkRedirectQuery, {
        id: pageTreeNodeId,
    });

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
