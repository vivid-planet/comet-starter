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
import { SvgImageBlock } from "@comet/cms-api";
import { IsString } from "class-validator";

import { RichTextBlock } from "./rich-text.block";

class KeyFactsItemBlockData extends BlockData {
    @ChildBlock(SvgImageBlock)
    icon: BlockDataInterface;

    @BlockField()
    fact: string;

    @BlockField()
    label: string;

    @ChildBlock(RichTextBlock)
    description: BlockDataInterface;
}

class KeyFactsItemBlockInput extends BlockInput {
    @ChildBlockInput(SvgImageBlock)
    icon: ExtractBlockInput<typeof SvgImageBlock>;

    @BlockField()
    @IsString()
    fact: string;

    @BlockField()
    @IsString()
    label: string;

    @ChildBlockInput(RichTextBlock)
    description: ExtractBlockInput<typeof RichTextBlock>;

    transformToBlockData(): KeyFactsItemBlockData {
        return inputToData(KeyFactsItemBlockData, this);
    }
}

export const KeyFactsItemBlock = createBlock(KeyFactsItemBlockData, KeyFactsItemBlockInput, "KeyFactsItem");
