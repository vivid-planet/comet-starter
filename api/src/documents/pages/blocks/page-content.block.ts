import { createBlocksBlock, YouTubeVideoBlock } from "@comet/blocks-api";
import { AnchorBlock, DamImageBlock, DamVideoBlock } from "@comet/cms-api";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";
import { TextImageBlock } from "@src/common/blocks/text-image.block";
import { ColumnsBlock } from "@src/documents/pages/blocks/columns.block";
import { KeyFactsBlock } from "@src/documents/pages/blocks/key-facts.block";

export const PageContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
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
            keyFacts: KeyFactsBlock,
        },
    },
    "PageContent",
);
