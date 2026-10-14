"use client";

import {
    type AiContentAltTextPrefixLabels,
    AiContentDisclosure,
    type AiContentDisclosureProps,
    calculateInheritAspectRatio,
    generateImageUrl,
    getAiContentAltTextWithPrefix,
    getMaxDimensionsFromArea,
    parseAspectRatio,
    PreviewSkeleton,
    type PropsWithData,
    withPreview,
} from "@dextinity/site-react";
import type { PixelImageBlockData } from "@src/blocks.generated";
import { ResponsiveImage, type ResponsiveImageProps } from "@src/common/components/ResponsiveImage";
import type { ReactNode } from "react";

import styles from "./PixelImageBlock.module.scss";

export type PixelImageBlockProps = PropsWithData<PixelImageBlockData> &
    Omit<ResponsiveImageProps, "src" | "loader" | "alt" | "blurDataURL"> & {
        aspectRatio: string | number | "inherit";
        /** Override props passed to the AI content disclosure badge. */
        aiContentDisclosureProps?: Partial<AiContentDisclosureProps>;
        /** Render your own AI content disclosure instead of the built-in badge. Pass `null` to render none. */
        aiContentDisclosure?: ReactNode;
        /** AI content prefix prepended to the alt text. Defaults to English; ideally pass a translated string here. */
        aiContentAltTextPrefixLabels?: Partial<AiContentAltTextPrefixLabels>;
    };

function createDominantImageDataUrl(width: number, height: number, dominantColor = "#ffffff") {
    const svg = `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="${dominantColor}" /></svg>`;
    return `data:image/svg+xml;base64,${typeof window === "undefined" ? Buffer.from(svg).toString("base64") : window.btoa(svg)}`;
}

/**
 * Port of PixelImageBlock from @dextinity/site-nextjs, using ResponsiveImage instead of next/image.
 */
export const PixelImageBlock = withPreview(
    ({
        aspectRatio,
        data: { damFile, cropArea, urlTemplate },
        fill,
        aiContentDisclosureProps,
        aiContentDisclosure,
        aiContentAltTextPrefixLabels,
        ...imageProps
    }: PixelImageBlockProps) => {
        const altText = getAiContentAltTextWithPrefix({
            aiContentType: damFile?.aiContentType,
            description: damFile?.altText,
            prefixLabels: aiContentAltTextPrefixLabels,
        });

        if (!damFile || !damFile.image) {
            return <PreviewSkeleton type="media" hasContent={false} aspectRatio={aspectRatio} fill={fill} />;
        }

        const usedCropArea = cropArea ?? damFile.image.cropArea;
        const usedAspectRatio = aspectRatio === "inherit" ? calculateInheritAspectRatio(damFile.image, usedCropArea) : parseAspectRatio(aspectRatio);
        const dimensions =
            usedCropArea.width && usedCropArea.height
                ? getMaxDimensionsFromArea(
                      { width: (usedCropArea.width * damFile.image.width) / 100, height: (usedCropArea.height * damFile.image.height) / 100 },
                      usedAspectRatio,
                  )
                : getMaxDimensionsFromArea({ width: damFile.image.width, height: damFile.image.height }, usedAspectRatio);

        const image = (
            <ResponsiveImage
                loader={(params) => generateImageUrl(params, usedAspectRatio)}
                src={urlTemplate}
                fill
                style={{ objectFit: "cover" }}
                blurDataURL={createDominantImageDataUrl(dimensions.width, dimensions.height, damFile.image.dominantColor ?? undefined)}
                alt={altText}
                title={damFile.title ?? ""}
                {...imageProps}
            />
        );

        const disclosure = damFile.aiContentType ? (
            aiContentDisclosure !== undefined ? (
                aiContentDisclosure
            ) : (
                <AiContentDisclosure type={damFile.aiContentType} {...aiContentDisclosureProps} />
            )
        ) : null;

        if (fill) {
            return (
                <>
                    {image}
                    {disclosure}
                </>
            );
        }

        return (
            <div className={styles.imageContainer} style={{ "--aspect-ratio": usedAspectRatio }}>
                {image}
                {disclosure}
            </div>
        );
    },
    { label: "PixelImage" },
);
