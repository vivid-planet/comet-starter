import * as React from "react";

interface SvgUseProps {
    xlinkHref: string;
    width: number;
    height: number;
}

export const SvgUse: React.FunctionComponent<SvgUseProps> = ({ xlinkHref, width, height }) => (
    <svg width={width} height={height}>
        <use xlinkHref={createAssetUrl(xlinkHref)} />
    </svg>
);

function createAssetUrl(url: string): string {
    if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
        return url;
    } else {
        return `/site${url}`;
    }
}
