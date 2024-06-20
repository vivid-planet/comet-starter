import { createBlocksBlock } from "@comet/blocks-api";
import { AnchorBlock } from "@comet/cms-api";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";

export const ColumnsContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            anchor: AnchorBlock,
            richtext: RichTextBlock,
            space: SpaceBlock,
            heading: HeadingBlock,
            callToActionList: CallToActionListBlock,
        },
    },
    {
        name: "ColumnsContent",
    },
);
