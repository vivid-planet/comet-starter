import { PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { MediaYoutubeVideoBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { useState } from "react";
import styled, { css } from "styled-components";

const EXPECTED_YT_ID_LENGTH = 11;

const parseYoutubeIdentifier = (value: string): string | undefined => {
    // regex from https://stackoverflow.com/a/51870158
    const regExp =
        /(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-zA-Z-]+)/;
    const match = value.match(regExp);
    const youtubeId = value.length === EXPECTED_YT_ID_LENGTH ? value : match && match[8].length == EXPECTED_YT_ID_LENGTH ? match[8] : null;

    return youtubeId ?? undefined;
};

interface YouTubeVideoBlockProps extends PropsWithData<MediaYoutubeVideoBlockData> {
    sizes: string;
}

// TODO: use aspectRatio from MediaBlock ???
export const YouTubeVideoBlock = withPreview(
    ({ data: { video, previewImage }, sizes }: YouTubeVideoBlockProps) => {
        const { youtubeIdentifier, autoplay, loop, showControls, aspectRatio } = video;

        const hasPreviewImage = previewImage && previewImage.block?.props.damFile;
        const [showPreviewImage, setShowPreviewImage] = useState(true);

        if (!youtubeIdentifier) return <PreviewSkeleton type="media" hasContent={false} />;
        const identifier = parseYoutubeIdentifier(youtubeIdentifier);

        const searchParams = new URLSearchParams();
        searchParams.append("modestbranding", "1");

        (autoplay !== undefined || (hasPreviewImage && !showPreviewImage)) &&
            searchParams.append("autoplay", Number(autoplay || (hasPreviewImage && !showPreviewImage)).toString());
        autoplay && searchParams.append("mute", "1");

        showControls !== undefined && searchParams.append("controls", Number(showControls).toString());

        showControls !== undefined && searchParams.append("loop", Number(showControls).toString());
        // the playlist parameter is needed so that the video loops. See https://developers.google.com/youtube/player_parameters#loop
        loop && identifier && searchParams.append("playlist", identifier);

        const youtubeBaseUrl = "https://www.youtube-nocookie.com/embed/";
        const youtubeUrl = new URL(`${youtubeBaseUrl}${identifier ?? ""}`);
        youtubeUrl.search = searchParams.toString();

        return (
            <Root>
                {hasPreviewImage && showPreviewImage && (
                    <PreviewImageWrapper onClick={() => setShowPreviewImage(false)}>
                        {/* TODO: Youtube aspect ratio do not fits with damImageBlock aspect ratio, remove toLowerCase */}
                        <DamImageBlock
                            data={previewImage}
                            objectFit={"cover"}
                            aspectRatio={aspectRatio.toLowerCase()}
                            layout={{ variant: "responsive", sizes: sizes }}
                        />
                    </PreviewImageWrapper>
                )}
                {(!showPreviewImage || !hasPreviewImage) && (
                    <VideoContainer $aspectRatio={aspectRatio.replace("X", "/")}>
                        <iframe src={youtubeUrl.toString()} allow="autoplay" />
                    </VideoContainer>
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

const VideoContainer = styled.div<{ $aspectRatio: string }>`
    overflow: hidden;
    position: relative;

    ${({ $aspectRatio }) =>
        css`
            aspect-ratio: ${$aspectRatio};
        `}

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }
`;
