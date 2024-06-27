"use client";
import { PixelImageBlock, PreviewSkeleton, PropsWithData, SvgImageBlock, withPreview } from "@comet/cms-site";
import { DamImageBlockData, PixelImageBlockData, SvgImageBlockData } from "@src/blocks.generated";
import { ImageProps } from "next/image";
import * as React from "react";

import { NextImageBottomPaddingFix } from "../NextImageBottomPaddingFix";

type Props = PropsWithData<DamImageBlockData> &
    Omit<ImageProps, "src" | "width" | "height"> & {
        aspectRatio?: string;
    } & (
        | { layout?: "fixed" | "intrinsic" }
        // The sizes prop must be specified for images with layout "fill" or "responsive", as recommended in the next/image documentation
        // https://nextjs.org/docs/api-reference/next/image#sizes
        | {
              layout?: "fill" | "responsive";
              sizes: string;
          }
    );

export const DamImageBlock = withPreview(
    ({ data: { block }, aspectRatio = "16x9", layout = "intrinsic", ...imageProps }: Props) => {
        if (!block) {
            return <PreviewSkeleton type="media" hasContent={false} />;
        }

        if (block.type === "pixelImage") {
            return (
                <NextImageBottomPaddingFix>
                    <PixelImageBlock data={block.props as PixelImageBlockData} layout={layout} aspectRatio={aspectRatio} {...imageProps} />
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
