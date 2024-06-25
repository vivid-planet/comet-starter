import { createOneOfBlock, YouTubeVideoBlock } from "@comet/blocks-api";
import { DamImageBlock, DamVideoBlock } from "@comet/cms-api";

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
