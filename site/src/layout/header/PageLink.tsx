import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { HiddenIfInvalidLink } from "@src/common/helpers/HiddenIfInvalidLink";
import { gql } from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { GQLPageLinkFragment } from "./PageLink.generated";

const pageLinkFragment = gql`
    fragment PageLink on PageTreeNode {
        path
        documentType
        document {
            __typename
            ... on Link {
                content
            }
        }
    }
`;

interface Props {
    page: GQLPageLinkFragment;
    children: ((active: boolean) => React.ReactNode) | React.ReactNode;
}

function PageLink({ page, children }: Props): JSX.Element | null {
    const router = useRouter();
    const active = router.asPath === page.path;

    if (page.documentType === "Link") {
        if (page.document === null || page.document.__typename !== "Link") {
            return null;
        }

        return (
            <HiddenIfInvalidLink link={page.document.content}>
                <LinkBlock data={page.document.content}>{typeof children === "function" ? children(active) : children}</LinkBlock>
            </HiddenIfInvalidLink>
        );
    } else if (page.documentType === "Page") {
        return (
            <Link href={page.path} passHref>
                {typeof children === "function" ? children(active) : children}
            </Link>
        );
    } else {
        if (process.env.NODE_ENV === "development") {
            throw new Error(`Unknown documentType "${page.documentType}"`);
        }

        return null;
    }
}

export { PageLink, pageLinkFragment };
