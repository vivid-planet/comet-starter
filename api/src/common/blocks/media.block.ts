import { createOneOfBlock } from "@comet/blocks-api";
import { MediaDamImageBlock } from "@src/common/blocks/media-dam-image.block";
import { MediaDamVideoBlock } from "@src/common/blocks/media-dam-video.block";
import { MediaYoutubeVideoBlock } from "@src/common/blocks/media-youtube-video.block";

export const MediaBlock = createOneOfBlock(
    {
        supportedBlocks: {
            image: MediaDamImageBlock,
            damVideo: MediaDamVideoBlock,
            youTubeVideo: MediaYoutubeVideoBlock,
        },
    },
    "Media",
);
