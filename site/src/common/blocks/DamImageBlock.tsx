"use client";
import { PixelImageBlock, PreviewSkeleton, PropsWithData, SvgImageBlock, withPreview } from "@comet/cms-site";
import { DamImageBlockData, PixelImageBlockData, SvgImageBlockData } from "@src/blocks.generated";
// eslint-disable-next-line import/no-extraneous-dependencies
import { BreakpointValue, theme } from "@src/theme";
import { ImageProps as NextImageProps } from "next/image";

import { NextImageBottomPaddingFix } from "../NextImageBottomPaddingFix";

type DamImageProps = Omit<NextImageProps, "src" | "width" | "height" | "alt"> & {
    aspectRatio?: string | "inherit";
};

export const DamImageBlock = withPreview(
    ({ data: { block }, aspectRatio = "16x9", layout = "intrinsic", ...imageProps }: PropsWithData<DamImageBlockData> & DamImageProps) => {
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

export const createSizes = (
    breakpointWidths: Partial<Record<keyof typeof theme.breakpoints, string | number>>,
    defaultWidth: string | number = "100vw",
): string => {
    const sizes: string[] = [];

    Object.keys(theme.breakpoints).forEach((breakpoint) => {
        const width = breakpointWidths[breakpoint];
        if (width !== undefined) {
            sizes.push(`(max-width: ${BreakpointValue[breakpoint]}px) ${typeof width === "string" ? width : `${width}px`}`);
        }
    });

    sizes.push(typeof defaultWidth === "string" ? defaultWidth : `${defaultWidth}px`);

    return sizes.join(", ");
};

export const hasValidImage = (data: DamImageBlockData): boolean => {
    if (data.block) {
        if (data.block.type === "pixelImage") {
            return (data.block.props as PixelImageBlockData).damFile?.image !== undefined;
        } else if (data.block.type === "svgImage") {
            return (data.block.props as SvgImageBlockData).damFile !== undefined;
        }
    }
    return false;
};
