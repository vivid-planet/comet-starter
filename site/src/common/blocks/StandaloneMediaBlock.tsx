"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { StandaloneMediaBlockData } from "@src/blocks.generated";
import { MediaBlock } from "@src/common/blocks/MediaBlock";

export const StandaloneMediaBlock = withPreview(
    ({ data: { media, aspectRatio } }: PropsWithData<StandaloneMediaBlockData>) => {
        return <MediaBlock data={media} aspectRatio={aspectRatio} />;
    },
    { label: "Media" },
);
