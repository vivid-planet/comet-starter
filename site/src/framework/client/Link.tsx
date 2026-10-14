"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

import { navigate } from "./router";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    replace?: boolean;
};

function shouldHandleClientSide(event: MouseEvent<HTMLAnchorElement>, anchor: HTMLAnchorElement) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return false;
    }
    if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) {
        return false;
    }
    return anchor.origin === window.location.origin;
}

/**
 * Replacement for `next/link`: renders a plain <a> that navigates client side (see entry.browser.tsx) for internal links.
 */
export function Link({ href, replace, onClick, ...anchorProps }: LinkProps) {
    return (
        <a
            {...anchorProps}
            href={href}
            onClick={(event) => {
                onClick?.(event);
                if (shouldHandleClientSide(event, event.currentTarget)) {
                    event.preventDefault();
                    navigate(event.currentTarget.href, { replace });
                }
            }}
        />
    );
}
