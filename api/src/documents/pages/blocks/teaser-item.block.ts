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
import { CallToActionBlock } from "@src/common/blocks/call-to-action.block";
import { MediaBlock } from "@src/common/blocks/media.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { IsString } from "class-validator";

class TeaserItemBlockData extends BlockData {
    @ChildBlock(MediaBlock)
    media: BlockDataInterface;

    @BlockField()
    title: string;

    @ChildBlock(RichTextBlock)
    description: BlockDataInterface;

    @ChildBlock(CallToActionBlock)
    callToAction: BlockDataInterface;
}

class TeaserItemBlockInput extends BlockInput {
    @ChildBlockInput(MediaBlock)
    media: ExtractBlockInput<typeof MediaBlock>;

    @BlockField()
    @IsString()
    title: string;

    @ChildBlockInput(RichTextBlock)
    description: ExtractBlockInput<typeof RichTextBlock>;

    @ChildBlockInput(CallToActionBlock)
    callToAction: ExtractBlockInput<typeof CallToActionBlock>;

    transformToBlockData(): TeaserItemBlockData {
        return inputToData(TeaserItemBlockData, this);
    }
}

export const TeaserItemBlock = createBlock(TeaserItemBlockData, TeaserItemBlockInput, "TeaserItem");
