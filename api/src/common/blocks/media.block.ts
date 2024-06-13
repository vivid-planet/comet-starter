import {
    BlockData,
    BlockDataInterface,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    createBlock,
    createOneOfBlock,
    ExtractBlockInput,
    inputToData,
    YouTubeVideoBlock,
} from "@comet/blocks-api";
import { MediaDamVideoBlock } from "@src/common/blocks/media-dam-video.block";
import { MediaDamImageBlock } from "@src/common/blocks/media-image.block";

export const MediaContentBlock = createOneOfBlock(
    {
        supportedBlocks: {
            image: MediaDamImageBlock,
            damVideo: MediaDamVideoBlock,
            youTubeVideo: YouTubeVideoBlock,
        },
    },
    "MediaContent",
);

class MediaBlockData extends BlockData {
    @ChildBlock(MediaContentBlock)
    media: BlockDataInterface;
}

class MediaBlockInput extends BlockInput {
    @ChildBlockInput(MediaContentBlock)
    media: ExtractBlockInput<typeof MediaContentBlock>;

    transformToBlockData(): MediaBlockData {
        return inputToData(MediaBlockData, this);
    }
}

export const MediaBlock = createBlock(MediaBlockData, MediaBlockInput, "Media");
