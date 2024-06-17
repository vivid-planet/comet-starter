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
import { DamImageBlock, DamVideoBlock } from "@comet/cms-api";
import { IsEnum, ValidateNested } from "class-validator";

export enum MediaDamVideoAspectRatio {
    "1x1" = "1x1",
    "16x9" = "16x9",
    "21x9" = "21x9",
    "3x2" = "3x2",
    "4x3" = "4x3",
    "4x5" = "4x5",
    "9x16" = "9x16",
}

class MediaDamVideoBlockData extends BlockData {
    @ChildBlock(DamVideoBlock)
    video: BlockDataInterface;

    @BlockField({ type: "enum", enum: MediaDamVideoAspectRatio })
    aspectRatio: MediaDamVideoAspectRatio;

    @ChildBlock(DamImageBlock)
    previewImage: BlockDataInterface;
}

class MediaDamVideoBlockInput extends BlockInput {
    @ValidateNested()
    @ChildBlockInput(DamVideoBlock)
    video: ExtractBlockInput<typeof DamVideoBlock>;

    @IsEnum(MediaDamVideoAspectRatio)
    @BlockField({ type: "enum", enum: MediaDamVideoAspectRatio })
    aspectRatio: MediaDamVideoAspectRatio;

    @ValidateNested()
    @ChildBlockInput(DamImageBlock)
    previewImage: ExtractBlockInput<typeof DamImageBlock>;

    transformToBlockData(): MediaDamVideoBlockData {
        return inputToData(MediaDamVideoBlockData, this);
    }
}

export const MediaDamVideoBlock = createBlock(MediaDamVideoBlockData, MediaDamVideoBlockInput, {
    name: "MediaDamVideo",
});
