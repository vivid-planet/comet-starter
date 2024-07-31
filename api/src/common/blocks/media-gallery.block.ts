import {
    BlockData,
    BlockDataInterface,
    BlockField,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    createBlock,
    createListBlock,
    inputToData,
} from "@comet/blocks-api";
import { MediaGalleryItemBlock } from "@src/common/blocks/media-gallery-item.block";
import { MediaAspectRatio } from "@src/common/blocks/standalone-media.block";
import { IsEnum } from "class-validator";

const MediaGalleryListBlock = createListBlock({ block: MediaGalleryItemBlock }, "MediaGalleryList");

class MediaGalleryBlockData extends BlockData {
    @ChildBlock(MediaGalleryListBlock)
    items: BlockDataInterface;

    @BlockField({ type: "enum", enum: MediaAspectRatio })
    aspectRatio: MediaAspectRatio;
}

class MediaGalleryBlockInput extends BlockInput {
    @ChildBlockInput(MediaGalleryListBlock)
    items: BlockDataInterface;

    @IsEnum(MediaAspectRatio)
    @BlockField({ type: "enum", enum: MediaAspectRatio })
    aspectRatio: MediaAspectRatio;

    transformToBlockData(): MediaGalleryBlockData {
        return inputToData(MediaGalleryBlockData, this);
    }
}

export const MediaGalleryBlock = createBlock(MediaGalleryBlockData, MediaGalleryBlockInput, "MediaGallery");
