"use client";
import { PreviewSkeleton, type PropsWithData, SvgImageBlock, withPreview } from "@dextinity/site-react";
import type { DamImageBlockData, PixelImageBlockData, SvgImageBlockData } from "@src/blocks.generated";
import { PixelImageBlock, type PixelImageBlockProps } from "@src/common/blocks/PixelImageBlock";

type DamImageProps = Omit<PixelImageBlockProps, "data" | "aspectRatio"> & {
    aspectRatio: string | "inherit";
};

export const DamImageBlock = withPreview(
    ({ data: { block }, aspectRatio, ...imageProps }: PropsWithData<DamImageBlockData> & DamImageProps) => {
        if (!block) {
            return <PreviewSkeleton type="media" hasContent={false} />;
        }

        if (block.type === "pixelImage") {
            return <PixelImageBlock data={block.props as PixelImageBlockData} aspectRatio={aspectRatio} {...imageProps} />;
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
