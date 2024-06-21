import { PixelImageBlock, PreviewSkeleton, PropsWithData, SvgImageBlock, withPreview } from "@comet/cms-site";
import { DamImageBlockData, PixelImageBlockData, SvgImageBlockData } from "@src/blocks.generated";
import { BreakpointValue, theme } from "@src/theme";
import { ImageProps as NextImageProps } from "next/image";

import { NextImageBottomPaddingFix } from "../NextImageBottomPaddingFix";

interface DynamicLayout {
    variant: "fill" | "responsive";
    sizes: string;
}

interface StaticLayout {
    variant: "fixed" | "intrinsic";
}

export type DamImageProps = Omit<NextImageProps, "src" | "width" | "height" | "layout" | "alt"> & {
    aspectRatio?: string | "inherit";
    layout?: DynamicLayout | StaticLayout;
};

const allowedAspectRatios = ["16x9", "4x3", "3x2", "3x1", "2x1", "1x1", "1x2", "1x3", "2x3", "3x4", "9x16", "21x9", "inherit"];

const getAspectRationNearestToAllowed = (aspectRatio: string): string => {
    let aspectRatioNearestToAllowed = aspectRatio;
    const aspectRatioDifferences: number[] = [];
    let keyForNearestAspectRatio = 0;

    if (!allowedAspectRatios.includes(aspectRatio)) {
        aspectRatio.replace("x", "/");

        allowedAspectRatios.forEach((allowedAspectRatio, key) => {
            if (allowedAspectRatio !== "inherit") {
                const aspectRatioDivided = eval(aspectRatio.replace("x", "/"));
                const allowedAspectRatioDivided = eval(allowedAspectRatio.replace("x", "/"));
                const diff = aspectRatioDivided - allowedAspectRatioDivided;

                aspectRatioDifferences.push(diff < 0 ? diff * -1 : diff);
            }
        });

        aspectRatioDifferences.forEach((aspectRatioDifference, key) => {
            if (aspectRatioDifference === Math.min(...aspectRatioDifferences)) {
                keyForNearestAspectRatio = key;
            }
        });

        aspectRatioNearestToAllowed = allowedAspectRatios[keyForNearestAspectRatio];
    }
    return aspectRatioNearestToAllowed;
};

export const DamImageBlock = withPreview(
    ({ data: { block }, aspectRatio = "16x9", layout, ...imageProps }: PropsWithData<DamImageBlockData> & DamImageProps) => {
        const aspectRatioNearestToAllowed = getAspectRationNearestToAllowed(aspectRatio);

        if (!block) {
            return <PreviewSkeleton type="media" hasContent={false} />;
        }

        if (block.type === "pixelImage") {
            return (
                <NextImageBottomPaddingFix>
                    <PixelImageBlock
                        data={block.props as PixelImageBlockData}
                        layout={layout?.variant ?? "intrinsic"}
                        sizes={layout && "sizes" in layout ? layout.sizes : undefined}
                        aspectRatio={aspectRatioNearestToAllowed}
                        {...imageProps}
                    />
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
