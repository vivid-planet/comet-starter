import * as React from "react";

interface SVGUseProps {
    xlinkHref: string;
    width: number;
    height: number;
}

export const SVGUse: React.FunctionComponent<SVGUseProps> = ({ xlinkHref, width, height }) => (
    <svg width={width} height={height}>
        <use xlinkHref={createAssetUrl(xlinkHref)} />
    </svg>
);

export function createAssetUrl(url: string): string {
    if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
        return url;
    } else {
        return `/site${url}`;
    }
}
