import { createBlocksBlock } from "@comet/blocks-api";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";

export const AccordionContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            richtext: RichTextBlock,
            heading: HeadingBlock,
            space: SpaceBlock,
            callToActionList: CallToActionListBlock,
        },
    },
    "AccordionContent",
);
