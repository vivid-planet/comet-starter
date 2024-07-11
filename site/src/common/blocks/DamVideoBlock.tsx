"use client";
import { PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { DamImageBlockData, DamVideoBlockData } from "@src/blocks.generated";
import { VideoPreviewImage } from "@src/common/helpers/VideoPreviewImage";
import { useState } from "react";
import styled, { css } from "styled-components";

// TODO: use aspectRatio and previewImage from the block data when available
interface DamVideoBlockProps extends PropsWithData<DamVideoBlockData> {
    previewImage?: DamImageBlockData;
    aspectRatio?: string;
    sizes?: string;
}

export const DamVideoBlock = withPreview(
    ({ data: { damFile, autoplay, loop, showControls }, previewImage, aspectRatio = "auto", sizes = "100vw" }: DamVideoBlockProps) => {
        if (damFile === undefined) {
            return <PreviewSkeleton type="media" hasContent={false} />;
        }

        const hasPreviewImage = previewImage && previewImage.block?.props.damFile;
        const [showPreviewImage, setShowPreviewImage] = useState(true);

        return (
            <>
                {hasPreviewImage && showPreviewImage && (
                    <VideoPreviewImage
                        onClick={() => setShowPreviewImage(false)}
                        image={previewImage}
                        aspectRatio={aspectRatio !== "auto" ? aspectRatio : undefined}
                        sizes={sizes}
                    />
                )}
                {(!showPreviewImage || !hasPreviewImage) && (
                    <Video
                        autoPlay={autoplay || (hasPreviewImage && !showPreviewImage)}
                        controls={showControls}
                        loop={loop}
                        playsInline
                        muted={autoplay}
                        $aspectRatio={aspectRatio !== "auto" ? aspectRatio.replace("x", " / ") : undefined}
                    >
                        <source src={damFile.fileUrl} type={damFile.mimetype} />
                    </Video>
                )}
            </>
        );
    },
    { label: "Video" },
);

const Video = styled.video<{ $aspectRatio?: string }>`
    width: 100%;
    object-fit: cover;

    ${({ $aspectRatio }) =>
        $aspectRatio &&
        css`
            aspect-ratio: ${$aspectRatio};
        `}
`;
