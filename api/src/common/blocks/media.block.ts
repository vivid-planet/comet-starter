import { createOneOfBlock, DamImageBlock, DamVideoBlock, YouTubeVideoBlock } from "@comet/cms-api";

export const MediaBlock = createOneOfBlock(
    {
        supportedBlocks: {
            image: DamImageBlock,
            damVideo: DamVideoBlock,
            youTubeVideo: YouTubeVideoBlock,
        },
    },
    "Media",
);
