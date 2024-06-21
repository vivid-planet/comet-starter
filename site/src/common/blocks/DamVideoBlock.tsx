import { PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { MediaDamVideoBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { useState } from "react";
import styled, { css } from "styled-components";

export const DamVideoBlock = withPreview(
    ({ data: { video, aspectRatio, previewImage } }: PropsWithData<MediaDamVideoBlockData>) => {
        const { damFile, autoplay, showControls } = video;

        if (damFile === undefined) {
            return <PreviewSkeleton type="media" hasContent={false} />;
        }

        const hasPreviewImage = previewImage && previewImage.block?.props.damFile;
        const [showPreviewImage, setShowPreviewImage] = useState(true);

        return (
            <Root>
                {hasPreviewImage && showPreviewImage && (
                    <PreviewImageWrapper onClick={() => setShowPreviewImage(false)}>
                        <DamImageBlock data={previewImage} objectFit={"cover"} aspectRatio={aspectRatio !== "auto" ? aspectRatio : undefined} />
                    </PreviewImageWrapper>
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
            </Root>
        );
    },
    { label: "Video" },
);

const Root = styled.div`
    position: relative;
`;

const PreviewImageWrapper = styled.div`
    z-index: 1;
    cursor: pointer;
`;

const Video = styled.video<{ $aspectRatio?: string }>`
    width: 100%;
    object-fit: cover;

    ${({ $aspectRatio }) =>
        $aspectRatio &&
        css`
            aspect-ratio: ${$aspectRatio};
        `}
`;
