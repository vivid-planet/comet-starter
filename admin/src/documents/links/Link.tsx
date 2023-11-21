import { gql } from "@apollo/client";
import { Link as LinkIcon } from "@comet/admin-icons";
import { createDocumentRootBlocksMethods, DocumentInterface } from "@comet/cms-admin";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { GQLLink, GQLLinkInput } from "@src/graphql.generated";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { EditLink } from "./EditLink";

export const Link: DocumentInterface<Pick<GQLLink, "content">, GQLLinkInput> = {
    displayName: <FormattedMessage id="generic.link" defaultMessage="Link" />,
    editComponent: EditLink,
    menuIcon: LinkIcon,
    getQuery: gql`
        query LinkDocument($id: ID!) {
            page: pageTreeNode(id: $id) {
                id
                name
                slug
                parentId
                document {
                    __typename
                    ... on DocumentInterface {
                        id
                        updatedAt
                    }
                    ... on Link {
                        content
                    }
                }
            }
        }
    `,
    updateMutation: gql`
        mutation UpdateLink($pageId: ID!, $input: LinkInput!, $lastUpdatedAt: DateTime, $attachedPageTreeNodeId: ID) {
            saveLink(linkId: $pageId, input: $input, lastUpdatedAt: $lastUpdatedAt, attachedPageTreeNodeId: $attachedPageTreeNodeId) {
                id
                content
                updatedAt
            }
        }
    `,
    ...createDocumentRootBlocksMethods({
        content: LinkBlock,
    }),
};
