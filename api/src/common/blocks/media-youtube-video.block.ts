import {
    BlockData,
    BlockDataInterface,
    BlockField,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    createBlock,
    ExtractBlockInput,
    inputToData,
    YouTubeVideoBlock,
} from "@comet/blocks-api";
import { DamImageBlock } from "@comet/cms-api";
import { IsEnum } from "class-validator";

enum MediaYoutubeVideoAspectRatio {
    "1x1" = "1x1",
    "16x9" = "16x9",
    "21x9" = "21x9",
    "3x2" = "3x2",
    "4x3" = "4x3",
    "4x5" = "4x5",
    "9x16" = "9x16",
}

class MediaYoutubeVideoBlockData extends BlockData {
    @ChildBlock(YouTubeVideoBlock)
    video: BlockDataInterface;

    @BlockField({ type: "enum", enum: MediaYoutubeVideoAspectRatio })
    aspectRatio: MediaYoutubeVideoAspectRatio;

    @ChildBlock(DamImageBlock)
    previewImage: BlockDataInterface;
}

class MediaYoutubeVideoBlockInput extends BlockInput {
    @ChildBlockInput(YouTubeVideoBlock)
    video: ExtractBlockInput<typeof YouTubeVideoBlock>;

    @IsEnum(MediaYoutubeVideoAspectRatio)
    @BlockField({ type: "enum", enum: MediaYoutubeVideoAspectRatio })
    aspectRatio: MediaYoutubeVideoAspectRatio;

    @ChildBlockInput(DamImageBlock)
    previewImage: ExtractBlockInput<typeof DamImageBlock>;

    transformToBlockData(): MediaYoutubeVideoBlockData {
        return inputToData(MediaYoutubeVideoBlockData, this);
    }
}

export const MediaYoutubeVideoBlock = createBlock(MediaYoutubeVideoBlockData, MediaYoutubeVideoBlockInput, {
    name: "MediaYoutubeVideo",
});
