import { PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { MediaDamVideoBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
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
            <div>
                {hasPreviewImage && showPreviewImage && (
                    <PreviewImageWrapper onClick={() => setShowPreviewImage(false)}>
                        <DamImageBlock
                            data={previewImage}
                            objectFit={"cover"}
                            aspectRatio={aspectRatio !== "auto" ? aspectRatio : undefined}
                            layout={{ variant: "responsive", sizes: sizes }}
                        />
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
            </div>
        );
    },
    { label: "Video" },
);

const PreviewImageWrapper = styled.div`
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
