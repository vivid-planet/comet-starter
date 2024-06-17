import {
    BlockData,
    BlockDataInterface,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    createBlock,
    ExtractBlockInput,
    inputToData,
    YouTubeVideoBlock,
} from "@comet/blocks-api";
import { DamImageBlock } from "@comet/cms-api";
import { ValidateNested } from "class-validator";

class MediaYoutubeVideoBlockData extends BlockData {
    @ChildBlock(YouTubeVideoBlock)
    video: BlockDataInterface;

    @ChildBlock(DamImageBlock)
    previewImage: BlockDataInterface;
}

class MediaYoutubeVideoBlockInput extends BlockInput {
    @ValidateNested()
    @ChildBlockInput(YouTubeVideoBlock)
    video: ExtractBlockInput<typeof YouTubeVideoBlock>;

    @ValidateNested()
    @ChildBlockInput(DamImageBlock)
    previewImage: ExtractBlockInput<typeof DamImageBlock>;

    transformToBlockData(): MediaYoutubeVideoBlockData {
        return inputToData(MediaYoutubeVideoBlockData, this);
    }
}

export const MediaYoutubeVideoBlock = createBlock(MediaYoutubeVideoBlockData, MediaYoutubeVideoBlockInput, {
    name: "MediaYoutubeVideo",
});
