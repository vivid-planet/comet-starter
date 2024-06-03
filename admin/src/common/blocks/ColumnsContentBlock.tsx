import { createBlocksBlock } from "@comet/blocks-admin";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";

export const ColumnsContentBlock = createBlocksBlock({
    name: "ColumnsContent",
    supportedBlocks: {
        richtext: RichTextBlock,
        space: SpaceBlock,
    },
});
