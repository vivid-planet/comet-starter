import { createBlocksBlock } from "@comet/blocks-api";
import { AnchorBlock, DamImageBlock, DamVideoBlock, YouTubeVideoBlock } from "@comet/cms-api";
import { AccordionBlock } from "@src/common/blocks/accordion.block";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";
import { TextImageBlock } from "@src/common/blocks/text-image.block";
import { ColumnsBlock } from "@src/documents/pages/blocks/columns.block";

export const PageContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            accordion: AccordionBlock,
            anchor: AnchorBlock,
            space: SpaceBlock,
            richtext: RichTextBlock,
            heading: HeadingBlock,
            image: DamImageBlock,
            textImage: TextImageBlock,
            damVideo: DamVideoBlock,
            youTubeVideo: YouTubeVideoBlock,
            columns: ColumnsBlock,
            callToActionList: CallToActionListBlock,
        },
    },
    "PageContent",
);
