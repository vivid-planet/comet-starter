import { usePreview } from "@comet/cms-site";
import { ExternalLinkBlockData, InternalLinkBlockData, LinkBlockData } from "@src/blocks.generated";
import * as React from "react";

interface HiddenIfInvalidLinkProps {
    link: LinkBlockData;
    children: React.ReactElement;
}

export function HiddenIfInvalidLink({ link, children }: HiddenIfInvalidLinkProps) {
    const { previewType } = usePreview();

    if (previewType === "BlockPreview") {
        return children;
    }

    if (!isValidLink(link)) {
        return null;
    }

    return children;
}

export const isValidLink = (link: LinkBlockData) => {
    return Boolean(
        link.block &&
            ((link.block.type === "internal" && (link.block.props as InternalLinkBlockData).targetPage) ||
                (link.block.type === "external" && (link.block.props as ExternalLinkBlockData).targetUrl)),
    );
};
