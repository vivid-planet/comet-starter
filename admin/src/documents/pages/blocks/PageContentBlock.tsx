import { createBlocksBlock } from "@comet/blocks-admin";
import { AnchorBlock } from "@comet/cms-admin";
import { AccordionBlock } from "@src/common/blocks/AccordionBlock";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { MediaGalleryBlock } from "@src/common/blocks/MediaGalleryBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { StandaloneHeadingBlock } from "@src/common/blocks/StandaloneHeadingBlock";
import { StandaloneMediaBlock } from "@src/common/blocks/StandaloneMediaBlock";
import { BillboardTeaserBlock } from "@src/documents/pages/blocks/BillboardTeaserBlock";
import { ColumnsBlock } from "@src/documents/pages/blocks/ColumnsBlock";
import { ContentGroupBlock } from "@src/documents/pages/blocks/ContentGroupBlock";
import { KeyFactsBlock } from "@src/documents/pages/blocks/KeyFactsBlock";
import { TeaserBlock } from "@src/documents/pages/blocks/TeaserBlock";

export const PageContentBlock = createBlocksBlock({
    name: "PageContent",
    supportedBlocks: {
        accordion: AccordionBlock,
        anchor: AnchorBlock,
        billboardTeaser: BillboardTeaserBlock,
        space: SpaceBlock,
        teaser: TeaserBlock,
        richtext: RichTextBlock,
        heading: StandaloneHeadingBlock,
        columns: ColumnsBlock,
        callToActionList: CallToActionListBlock,
        keyFacts: KeyFactsBlock,
        media: StandaloneMediaBlock,
        contentGroup: ContentGroupBlock,
        mediaGallery: MediaGalleryBlock,
    },
});
