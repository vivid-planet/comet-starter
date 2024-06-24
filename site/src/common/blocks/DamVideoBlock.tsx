import { PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { MediaDamVideoBlockData } from "@src/blocks.generated";
import { VideoPreviewImage } from "@src/common/helpers/VideoPreviewImage";
import { useState } from "react";
import styled, { css } from "styled-components";

interface DamVideoBlockProps extends PropsWithData<MediaDamVideoBlockData> {
    sizes?: string;
}

export const DamVideoBlock = withPreview(
    ({ data: { video, aspectRatio, previewImage }, sizes = "100vw" }: DamVideoBlockProps) => {
        const { damFile, autoplay, showControls } = video;

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
