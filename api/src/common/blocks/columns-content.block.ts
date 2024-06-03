import { createBlocksBlock } from "@comet/blocks-api";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";

export const ColumnsContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            richtext: RichTextBlock,
            space: SpaceBlock,
        },
    },
    {
        name: "ColumnsContent",
    },
);
