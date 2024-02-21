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
import { IsEnum } from "class-validator";

import { RichTextBlock } from "./rich-text.block";

export enum HeadlineLevel {
    HeaderOne = "header-one",
    HeaderTwo = "header-two",
    HeaderThree = "header-three",
}

class HeadlineBlockData extends BlockData {
    @ChildBlock(RichTextBlock)
    headline: BlockDataInterface;

    @BlockField({ type: "enum", enum: HeadlineLevel })
    level: HeadlineLevel;
}

class HeadlineBlockInput extends BlockInput {
    @ChildBlockInput(RichTextBlock)
    headline: ExtractBlockInput<typeof RichTextBlock>;

    @IsEnum(HeadlineLevel)
    @BlockField({ type: "enum", enum: HeadlineLevel })
    level: HeadlineLevel;

    transformToBlockData(): HeadlineBlockData {
        return inputToData(HeadlineBlockData, this);
    }
}

export const HeadlineBlock = createBlock(HeadlineBlockData, HeadlineBlockInput, "Headline");
