import {
    BlockData,
    BlockDataInterface,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    createBlock,
    ExtractBlockInput,
    inputToData,
} from "@comet/blocks-api";
import { DamImageBlock } from "@comet/cms-api";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";

class StageBlockData extends BlockData {
    // TODO: use media block
    @ChildBlock(DamImageBlock)
    image: BlockDataInterface;

    @ChildBlock(HeadingBlock)
    heading: BlockDataInterface;

    @ChildBlock(RichTextBlock)
    text: BlockDataInterface;

    @ChildBlock(CallToActionListBlock)
    callToActionList: BlockDataInterface;
}

class StageBlockInput extends BlockInput {
    @ChildBlockInput(DamImageBlock)
    image: ExtractBlockInput<typeof DamImageBlock>;

    @ChildBlockInput(HeadingBlock)
    heading: ExtractBlockInput<typeof HeadingBlock>;

    @ChildBlockInput(RichTextBlock)
    text: ExtractBlockInput<typeof RichTextBlock>;

    @ChildBlockInput(CallToActionListBlock)
    callToActionList: ExtractBlockInput<typeof CallToActionListBlock>;

    transformToBlockData(): StageBlockData {
        return inputToData(StageBlockData, this);
    }
}

export const StageBlock = createBlock(StageBlockData, StageBlockInput, "Stage");
