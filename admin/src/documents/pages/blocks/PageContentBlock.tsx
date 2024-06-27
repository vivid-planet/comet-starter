import { createBlocksBlock } from "@comet/blocks-admin";
import { AnchorBlock } from "@comet/cms-admin";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";

export const PageContentBlock = createBlocksBlock({
    name: "PageContent",
    supportedBlocks: {
        anchor: AnchorBlock,
        space: SpaceBlock,
        richtext: RichTextBlock,
        heading: HeadingBlock,
        callToActionList: CallToActionListBlock,
        media: MediaBlock,
    },
});
