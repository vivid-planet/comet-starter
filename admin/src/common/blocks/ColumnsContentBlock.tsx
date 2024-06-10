import { createBlocksBlock } from "@comet/blocks-admin";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";

export const ColumnsContentBlock = createBlocksBlock({
    name: "ColumnsContent",
    supportedBlocks: {
        richtext: RichTextBlock,
        space: SpaceBlock,
        heading: HeadingBlock,
    },
});
