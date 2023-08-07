import { PropsWithData, withPreview } from "@comet/cms-site";
import { YouTubeVideoBlockData } from "@src/blocks.generated";
import * as React from "react";
import styled from "styled-components";

const getHeightInPercentForAspectRatio = (aspectRatio: YouTubeVideoBlockData["aspectRatio"]) => {
    switch (aspectRatio) {
        case "16X9":
            return 56.25;
        case "4X3":
            return 75;
    }
};

export const YouTubeVideoBlock = withPreview(
    ({ data: { youtubeIdentifier, autoplay, showControls, aspectRatio } }: PropsWithData<YouTubeVideoBlockData>) => {
        try {
            const url = new URL(youtubeIdentifier);
            const searchParams = url.searchParams;
            if (!searchParams.has("v")) {
                throw new Error("URL has no ID (v) param");
            }
            youtubeIdentifier = searchParams.get("v") as string;
        } catch (error) {
            // no url, but ID was specified
        }

        return (
            <Root heightInPercent={getHeightInPercentForAspectRatio(aspectRatio)}>
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeIdentifier}?&modestbranding=1&autoplay=${Number(autoplay)}&mute=${Number(
                        autoplay,
                    )}&controls=${Number(showControls)}`}
                    frameBorder="0"
                />
            </Root>
        );
    },
    { label: "Video" },
);

const Root = styled.div<{
    heightInPercent: number;
}>`
    height: 0;
    overflow: hidden;
    padding-top: ${({ heightInPercent }) => heightInPercent}%;
    position: relative;

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;
