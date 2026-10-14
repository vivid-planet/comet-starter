"use client";

import dextinityConfig from "@src/dextinity-config.json";
import { type CSSProperties, type ImgHTMLAttributes, useState } from "react";

export type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height" | "loading"> & {
    src: string;
    /** Builds the URL of the image for the given width */
    loader: (params: { src: string; width: number }) => string;
    /** Fill the parent element (which must be positioned) */
    fill?: boolean;
    /** Load the image immediately with high priority, use for the largest image above the fold */
    priority?: boolean;
    /** Shown until the image is loaded */
    blurDataURL?: string;
};

const deviceSizes = dextinityConfig.images.deviceSizes;
const allSizes = [...dextinityConfig.images.imageSizes, ...deviceSizes].sort((a, b) => a - b);

// Same width selection as next/image: only include widths that are relevant for the smallest vw value of the sizes attribute
function getWidths(sizes: string | undefined) {
    if (!sizes) {
        return deviceSizes;
    }
    const percentSizes = Array.from(sizes.matchAll(/(^|\s)(1?\d?\d)vw/g)).map((match) => parseInt(match[2], 10));
    if (percentSizes.length === 0) {
        return allSizes;
    }
    const smallestRatio = Math.min(...percentSizes) * 0.01;
    return allSizes.filter((size) => size >= deviceSizes[0] * smallestRatio);
}

const fillStyle: CSSProperties = { position: "absolute", height: "100%", width: "100%", inset: 0 };

/**
 * Replacement for next/image (which is used by the PixelImageBlock of @dextinity/site-nextjs): renders an <img> with srcset/sizes
 * using the given loader. The images are optimized by imgproxy via the Dextinity API, no image optimization is needed in the site.
 */
export function ResponsiveImage({ src, loader, fill, priority, blurDataURL, sizes, style, onLoad, ...imageProps }: ResponsiveImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const widths = getWidths(sizes);

    const placeholderStyle: CSSProperties =
        blurDataURL && !isLoaded
            ? { backgroundImage: `url("${blurDataURL}")`, backgroundSize: "cover", backgroundPosition: "50% 50%", backgroundRepeat: "no-repeat" }
            : {};

    return (
        <img
            {...imageProps}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            sizes={sizes ?? "100vw"}
            srcSet={widths.map((width) => `${loader({ src, width })} ${width}w`).join(", ")}
            src={loader({ src, width: widths[widths.length - 1] })}
            style={{ ...(fill ? fillStyle : {}), color: "transparent", ...placeholderStyle, ...style }}
            onLoad={(event) => {
                setIsLoaded(true);
                onLoad?.(event);
            }}
        />
    );
}
