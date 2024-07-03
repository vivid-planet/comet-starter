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
import { KeyFactsItemBlock } from "@src/documents/pages/blocks/key-facts-item.block";

const KeyFactsItemsBlock = createListBlock({ block: KeyFactsItemBlock }, "KeyFactsItems");

class KeyFactsBlockData extends BlockData {
    @ChildBlock(HeadingBlock)
    heading: BlockDataInterface;

    @ChildBlock(KeyFactsItemsBlock)
    items: BlockDataInterface;
}

class KeyFactsBlockInput extends BlockInput {
    @ChildBlockInput(HeadingBlock)
    heading: ExtractBlockInput<typeof HeadingBlock>;

    @ChildBlockInput(KeyFactsItemsBlock)
    items: ExtractBlockInput<typeof KeyFactsItemsBlock>;

    transformToBlockData(): KeyFactsBlockData {
        return inputToData(KeyFactsBlockData, this);
    }
}

export const KeyFactsBlock = createBlock(KeyFactsBlockData, KeyFactsBlockInput, "KeyFacts");
