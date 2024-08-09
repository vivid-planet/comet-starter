import { createBlocksBlock } from "@comet/blocks-api";
import { AnchorBlock } from "@comet/cms-api";
import { AccordionBlock } from "@src/common/blocks/accordion.block";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";
import { StandaloneMediaBlock } from "@src/common/blocks/standalone-media.block";
import { BillboardTeaserBlock } from "@src/documents/pages/blocks/billboard-teaser.block";
import { ColumnsBlock } from "@src/documents/pages/blocks/columns.block";
import { ContentGroupBlock } from "@src/documents/pages/blocks/content-group.block";
import { KeyFactsBlock } from "@src/documents/pages/blocks/key-facts.block";
import { TeaserBlock } from "@src/documents/pages/blocks/teaser.block";

export const PageContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            accordion: AccordionBlock,
            anchor: AnchorBlock,
            billboardTeaser: BillboardTeaserBlock,
            space: SpaceBlock,
            teaser: TeaserBlock,
            richtext: RichTextBlock,
            heading: HeadingBlock,
            columns: ColumnsBlock,
            callToActionList: CallToActionListBlock,
            keyFacts: KeyFactsBlock,
            media: StandaloneMediaBlock,
            contentGroup: ContentGroupBlock,
        },
    },
    "PageContent",
);
