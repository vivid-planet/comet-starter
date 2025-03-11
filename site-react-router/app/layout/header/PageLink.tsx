"use client";
import { LinkBlock } from "@app/common/blocks/LinkBlock";
import { HiddenIfInvalidLink } from "@app/common/helpers/HiddenIfInvalidLink";
//import Link from "next/link";
//import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

import { type GQLPageLinkFragment } from "./PageLink.fragment.generated";
import { Link } from "react-router";

interface Props extends PropsWithChildren {
    page: GQLPageLinkFragment;
    className?: string;
    activeClassName?: string;
}

function PageLink({ page, children, className: passedClassName, activeClassName }: Props) {
    //const pathname = usePathname();
    //const active = pathname && (pathname.substring(3) || "/") === page.path; // Remove language prefix
    const active = false; //TODO

    let className = passedClassName;

    if (active) {
        className = className ? `${className} ${activeClassName}` : activeClassName;
    }

    if (page.documentType === "Link") {
        if (page.document === null || page.document.__typename !== "Link") {
            return null;
        }

        return (
            <HiddenIfInvalidLink link={page.document.content}>
                <LinkBlock data={page.document.content} className={className}>
                    {children}
                </LinkBlock>
            </HiddenIfInvalidLink>
        );
    } else if (page.documentType === "Page" || page.documentType === "PredefinedPage") {
        return (
            <Link to={`/${page.scope.language}${page.path}`} className={className}>
                {children}
            </Link>
        );
    } else {
        if (process.env.NODE_ENV === "development") {
            throw new Error(`Unknown documentType "${page.documentType}"`);
        }

        return null;
    }
}

export { PageLink };
