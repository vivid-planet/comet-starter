import {
    BlockData,
    BlockDataInterface,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    createBlock,
    createListBlock,
    ExtractBlockInput,
    inputToData,
} from "@comet/blocks-api";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { TeaserItemBlock } from "@src/documents/pages/blocks/teaser-item.block";

const TeaserItemsBlock = createListBlock({ block: TeaserItemBlock }, "TeaserItems");

class TeaserBlockData extends BlockData {
    @ChildBlock(HeadingBlock)
    heading: BlockDataInterface;

    @ChildBlock(TeaserItemsBlock)
    items: BlockDataInterface;
}

class TeaserBlockInput extends BlockInput {
    @ChildBlockInput(HeadingBlock)
    heading: ExtractBlockInput<typeof HeadingBlock>;

    @ChildBlockInput(TeaserItemsBlock)
    items: ExtractBlockInput<typeof TeaserItemsBlock>;

    transformToBlockData(): TeaserBlockData {
        return inputToData(TeaserBlockData, this);
    }
}

export const TeaserBlock = createBlock(TeaserBlockData, TeaserBlockInput, "Teaser");
