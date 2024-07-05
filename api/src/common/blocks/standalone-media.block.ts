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
} from "@comet/blocks-api";
import { MediaBlock } from "@src/common/blocks/media.block";
import { IsEnum } from "class-validator";

export enum MediaAspectRatio {
    "16x9" = "16x9",
    "4x3" = "4x3",
    "3x2" = "3x2",
    "1x1" = "1x1",
    "2x3" = "2x3",
    "3x4" = "3x4",
    "4x5" = "4x5",
    "9x16" = "9x16",
}

class StandaloneMediaBlockData extends BlockData {
    @ChildBlock(MediaBlock)
    media: BlockDataInterface;

    @BlockField({ type: "enum", enum: MediaAspectRatio })
    aspectRatio: MediaAspectRatio;
}

class StandaloneMediaBlockInput extends BlockInput {
    @ChildBlockInput(MediaBlock)
    media: ExtractBlockInput<typeof MediaBlock>;

    @IsEnum(MediaAspectRatio)
    @BlockField({ type: "enum", enum: MediaAspectRatio })
    aspectRatio: MediaAspectRatio;

    transformToBlockData(): StandaloneMediaBlockData {
        return inputToData(StandaloneMediaBlockData, this);
    }
}

export const StandaloneMediaBlock = createBlock(StandaloneMediaBlockData, StandaloneMediaBlockInput, {
    name: "StandaloneMedia",
});
