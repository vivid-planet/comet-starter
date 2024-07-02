import { createBlocksBlock, YouTubeVideoBlock } from "@comet/blocks-admin";
import { AnchorBlock, DamImageBlock, DamVideoBlock } from "@comet/cms-admin";
import { AccordionBlock } from "@src/common/blocks/AccordionBlock";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { TextImageBlock } from "@src/common/blocks/TextImageBlock";
import { ColumnsBlock } from "@src/documents/pages/blocks/ColumnsBlock";
import { KeyFactsBlock } from "@src/documents/pages/blocks/KeyFactsBlock";

export const PageContentBlock = createBlocksBlock({
    name: "PageContent",
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
        keyFacts: KeyFactsBlock,
    },
});
