"use client";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { HiddenIfInvalidLink } from "@src/common/helpers/HiddenIfInvalidLink";
import { JSX, PropsWithChildren } from "react";

import { GQLPageLinkFragment } from "./PageLink.fragment.generated";
import { usePathname } from "@src/util/usePathname";

interface Props extends PropsWithChildren {
    page: GQLPageLinkFragment;
    className?: string;
    activeClassName?: string;
}

function PageLink({ page, children, className: passedClassName, activeClassName }: Props): JSX.Element | null {
    const pathname = usePathname();
    const active = pathname && (pathname.substring(3) || "/") === page.path; // Remove language prefix    

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
    } else if (page.documentType === "Page") {
        return (
            <a href={`/${page.scope.language}${page.path}`} className={className}>
                {children}
            </a>
        );
    } else if (page.documentType === "PredefinedPage") {
        return (
            <a href={`/${page.scope.language}${page.path}`} className={className}>
                {children}
            </a>
        );
    } else {
        if (process.env.NODE_ENV === "development") {
            throw new Error(`Unknown documentType "${page.documentType}"`);
        }

        return null;
    }
}

export { PageLink };
