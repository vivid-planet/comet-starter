"use client";

import {
    DamVideoBlock as LibraryDamVideoBlock,
    VideoPreviewImage,
    type VideoPreviewImageProps,
    VimeoVideoBlock as LibraryVimeoVideoBlock,
    YouTubeVideoBlock as LibraryYouTubeVideoBlock,
} from "@dextinity/site-react";
import type { ComponentProps } from "react";

import { PixelImageBlock } from "./PixelImageBlock";

/**
 * The video blocks of @dextinity/site-react need a renderPreviewImage prop, @dextinity/site-nextjs passes one that uses next/image.
 * These wrappers pass one that uses our PixelImageBlock.
 */
function renderPreviewImage(props: VideoPreviewImageProps) {
    return <VideoPreviewImage {...props} renderImage={(imageProps) => <PixelImageBlock {...imageProps} />} />;
}

type WithOptionalRenderPreviewImage<Props extends { renderPreviewImage: unknown }> = Omit<Props, "renderPreviewImage"> &
    Partial<Pick<Props, "renderPreviewImage">>;

export function DamVideoBlock(props: WithOptionalRenderPreviewImage<ComponentProps<typeof LibraryDamVideoBlock>>) {
    return <LibraryDamVideoBlock renderPreviewImage={renderPreviewImage} {...props} />;
}

export function YouTubeVideoBlock(props: WithOptionalRenderPreviewImage<ComponentProps<typeof LibraryYouTubeVideoBlock>>) {
    return <LibraryYouTubeVideoBlock renderPreviewImage={renderPreviewImage} {...props} />;
}

export function VimeoVideoBlock(props: WithOptionalRenderPreviewImage<ComponentProps<typeof LibraryVimeoVideoBlock>>) {
    return <LibraryVimeoVideoBlock renderPreviewImage={renderPreviewImage} {...props} />;
}
