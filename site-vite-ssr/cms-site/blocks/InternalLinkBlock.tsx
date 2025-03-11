"use client";
//import Link from "next/link";
import { type PropsWithChildren } from "react";

import { type InternalLinkBlockData } from "../blocks.generated";
import { type PropsWithData } from "./PropsWithData";
//import { Link } from "react-router";

interface InternalLinkBlockProps extends PropsWithChildren<PropsWithData<InternalLinkBlockData>> {
    title?: string;
    className?: string;
    legacyBehavior?: boolean;
}

/**
 * @deprecated There should be a copy of this component in the application for flexibility (e.g. multi language support)
 */
export function InternalLinkBlock({ data: { targetPage, targetPageAnchor }, children, title, className, legacyBehavior }: InternalLinkBlockProps) {
    if (!targetPage) {
        if (legacyBehavior) {
            return <>{children}</>;
        }

        return <span className={className}>{children}</span>;
    }

    const href = targetPageAnchor !== undefined ? `${targetPage.path}#${targetPageAnchor}` : targetPage.path;

    if (legacyBehavior) {
        return (
            //<Link href={href} title={title} passHref legacyBehavior>
            <a href={href} title={title}>
                {children}
            </a>
        );
    }

    return (
        //<Link to={href} title={title} className={className}>
        <a href={href} title={title} className={className}>
            {children}
        </a>
    );
}
