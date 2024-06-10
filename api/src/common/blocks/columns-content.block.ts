import { createBlocksBlock } from "@comet/blocks-api";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";

export const ColumnsContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            richtext: RichTextBlock,
            space: SpaceBlock,
            heading: HeadingBlock,
        },
    },
    {
        name: "ColumnsContent",
    },
);
