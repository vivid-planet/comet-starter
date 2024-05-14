import { usePreview } from "@comet/cms-site";
import { ExternalLinkBlockData, InternalLinkBlockData, LinkBlockData } from "@src/blocks.generated";
import * as React from "react";

interface HiddenIfInvalidLinkProps {
    link: LinkBlockData;
    children: React.ReactElement;
}

export function HiddenIfInvalidLink({ link: { block }, children }: HiddenIfInvalidLinkProps): React.ReactElement | null {
    const { previewType } = usePreview();

    if (previewType === "BlockPreview") {
        return children;
    }

    if (!isValidLink(block)) {
        return null;
    }

    return children;
}

const isValidLink = (linkBlock: LinkBlockData["block"]) => {
    return Boolean(
        linkBlock &&
            ((linkBlock.type === "internal" && (linkBlock.props as InternalLinkBlockData).targetPage) ||
                (linkBlock.type === "external" && (linkBlock.props as ExternalLinkBlockData).targetUrl)),
    );
};
