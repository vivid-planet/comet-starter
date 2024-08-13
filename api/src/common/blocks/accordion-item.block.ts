import {
    BlockData,
    BlockDataInterface,
    BlockField,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    createBlock,
    createBlocksBlock,
    ExtractBlockInput,
    inputToData,
} from "@comet/blocks-api";
import { IsUndefinable } from "@comet/cms-api";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";
import { StandaloneHeadingBlock } from "@src/common/blocks/standalone-heading.block";
import { IsBoolean, IsString } from "class-validator";

const AccordionContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            richtext: RichTextBlock,
            heading: StandaloneHeadingBlock,
            space: SpaceBlock,
            callToActionList: CallToActionListBlock,
        },
    },
    "AccordionContent",
);

class AccordionItemBlockData extends BlockData {
    @BlockField({ nullable: true })
    title?: string;

    @ChildBlock(AccordionContentBlock)
    content: BlockDataInterface;

    @BlockField()
    openByDefault: boolean;
}

class AccordionItemBlockInput extends BlockInput {
    @IsUndefinable()
    @BlockField({ nullable: true })
    @IsString()
    title?: string;

    @ChildBlockInput(AccordionContentBlock)
    content: ExtractBlockInput<typeof AccordionContentBlock>;

    @IsBoolean()
    @BlockField()
    openByDefault: boolean;

    transformToBlockData(): AccordionItemBlockData {
        return inputToData(AccordionItemBlockData, this);
    }
}

export const AccordionItemBlock = createBlock(AccordionItemBlockData, AccordionItemBlockInput, "AccordionItem");
