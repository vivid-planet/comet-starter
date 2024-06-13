import { createBlocksBlock } from "@comet/blocks-admin";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";

export const AccordionContentBlock = createBlocksBlock({
    name: "AccordionContent",
    supportedBlocks: {
        richtext: RichTextBlock,
        space: SpaceBlock,
        heading: HeadingBlock,
        callToActionList: CallToActionListBlock,
    },
});
