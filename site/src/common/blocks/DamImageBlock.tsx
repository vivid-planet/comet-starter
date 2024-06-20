import { PixelImageBlock, PreviewSkeleton, PropsWithData, SvgImageBlock, withPreview } from "@comet/cms-site";
import { DamImageBlockData, PixelImageBlockData, SvgImageBlockData } from "@src/blocks.generated";
import { ImageProps as NextImageProps } from "next/image";
import * as React from "react";

import { NextImageBottomPaddingFix } from "../NextImageBottomPaddingFix";

export type DamImageProps = Omit<NextImageProps, "src" | "width" | "height" | "layout" | "alt"> & {
    aspectRatio?: string | "inherit";
};

export const DamImageBlock = withPreview(
    ({ data: { block }, aspectRatio = "16x9", ...imageProps }: PropsWithData<DamImageBlockData> & DamImageProps) => {
        if (!block) {
            return <PreviewSkeleton type="media" hasContent={false} />;
        }

        if (block.type === "pixelImage") {
            return (
                <NextImageBottomPaddingFix>
                    <PixelImageBlock data={block.props as PixelImageBlockData} layout={"intrinsic"} aspectRatio={aspectRatio} {...imageProps} />
                </NextImageBottomPaddingFix>
            );
        } else if (block.type === "svgImage") {
            return <SvgImageBlock data={block.props as SvgImageBlockData} />;
        } else {
            return (
                <>
                    Unknown block type: <strong>{block.type}</strong>
                </>
            );
        }
    },
    { label: "Image" },
);

// TODO: createSizes
