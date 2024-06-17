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
import { DamImageBlock } from "@comet/cms-api";
import { IsEnum, ValidateNested } from "class-validator";

export enum MediaDamImageAspectRatio {
    "16x9" = "16x9",
    "4x3" = "4x3",
    "3x2" = "3x2",
    "1x1" = "1x1",
    "2x3" = "2x3",
    "3x4" = "3x4",
}

class MediaDamImageBlockData extends BlockData {
    @ChildBlock(DamImageBlock)
    image: BlockDataInterface;

    @BlockField({ type: "enum", enum: MediaDamImageAspectRatio })
    aspectRatio: MediaDamImageAspectRatio;
}

class MediaDamImageBlockInput extends BlockInput {
    @ValidateNested()
    @ChildBlockInput(DamImageBlock)
    image: ExtractBlockInput<typeof DamImageBlock>;

    @IsEnum(MediaDamImageAspectRatio)
    @BlockField({ type: "enum", enum: MediaDamImageAspectRatio })
    aspectRatio: MediaDamImageAspectRatio;

    transformToBlockData(): MediaDamImageBlockData {
        return inputToData(MediaDamImageBlockData, this);
    }
}

export const MediaDamImageBlock = createBlock(MediaDamImageBlockData, MediaDamImageBlockInput, {
    name: "MediaDamImage",
});
