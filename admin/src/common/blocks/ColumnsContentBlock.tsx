import { createBlocksBlock } from "@comet/blocks-admin";
import { AnchorBlock } from "@comet/cms-admin";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";

export const ColumnsContentBlock = createBlocksBlock({
    name: "ColumnsContent",
    supportedBlocks: {
        anchor: AnchorBlock,
        richtext: RichTextBlock,
        space: SpaceBlock,
        heading: HeadingBlock,
        callToActionList: CallToActionListBlock,
    },
});
