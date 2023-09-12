import * as React from "react";

interface SvgUseProps extends React.SVGProps<SVGSVGElement> {
    xlinkHref: string;
}

export const SvgUse: React.FunctionComponent<SvgUseProps> = ({ xlinkHref, ...props }) => (
    <svg {...props}>
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
