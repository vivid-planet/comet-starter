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
import { AnchorBlock } from "@comet/cms-api";
import { AccordionBlock } from "@src/common/blocks/accordion.block";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";
import { StandaloneMediaBlock } from "@src/common/blocks/standalone-media.block";
import { ColumnsBlock } from "@src/documents/pages/blocks/columns.block";
import { KeyFactsBlock } from "@src/documents/pages/blocks/key-facts.block";
import { TeaserBlock } from "@src/documents/pages/blocks/teaser.block";
import { IsEnum, ValidateNested } from "class-validator";

const ContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            accordion: AccordionBlock,
            anchor: AnchorBlock,
            space: SpaceBlock,
            teaser: TeaserBlock,
            richtext: RichTextBlock,
            heading: HeadingBlock,
            columns: ColumnsBlock,
            callToActionList: CallToActionListBlock,
            keyFacts: KeyFactsBlock,
            media: StandaloneMediaBlock,
        },
    },
    { name: "Content" },
);

enum BackgroundColor {
    default = "default",
    lightGrey = "lightGrey",
    darkGrey = "darkGrey",
}

class ContentGroupBlockData extends BlockData {
    @ChildBlock(ContentBlock)
    content: BlockDataInterface;

    @BlockField({ type: "enum", enum: BackgroundColor })
    backgroundColor: BackgroundColor;
}

class ContentGroupBlockInput extends BlockInput {
    @ValidateNested()
    @ChildBlockInput(ContentBlock)
    content: ExtractBlockInput<typeof ContentBlock>;

    @IsEnum(BackgroundColor)
    @BlockField({ type: "enum", enum: BackgroundColor })
    backgroundColor: BackgroundColor;

    transformToBlockData(): ContentGroupBlockData {
        return inputToData(ContentGroupBlockData, this);
    }
}

export const ContentGroupBlock = createBlock(ContentGroupBlockData, ContentGroupBlockInput, "ContentGroup");
