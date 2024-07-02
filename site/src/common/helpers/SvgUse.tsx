import * as React from "react";

interface SvgUseProps extends React.SVGProps<SVGSVGElement> {
    href: string;
}

export const SvgUse: React.FunctionComponent<SvgUseProps> = ({ href, ...props }) => {
    const assetUrl = createAssetUrl(href);
    return (
        <svg {...props}>
            <use href={assetUrl} xlinkHref={assetUrl} />
        </svg>
    );
};

function createAssetUrl(url: string): string {
    if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
        return url;
    } else {
        return `/site${url}`;
    }
}
