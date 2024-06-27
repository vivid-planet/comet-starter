"use client";
import * as React from "react";

interface SvgUseProps extends React.SVGProps<SVGSVGElement> {
    href: string;
}

export const SvgUse: React.FunctionComponent<SvgUseProps> = ({ href, ...props }) => {
    return (
        <svg {...props}>
            <use href={href} xlinkHref={href} />
        </svg>
    );
};
