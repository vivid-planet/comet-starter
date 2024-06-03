import { createBlocksBlock, YouTubeVideoBlock } from "@comet/blocks-admin";
import { AnchorBlock, DamImageBlock, DamVideoBlock } from "@comet/cms-admin";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadlineBlock } from "@src/common/blocks/HeadlineBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { TextImageBlock } from "@src/common/blocks/TextImageBlock";

export const PageContentBlock = createBlocksBlock({
    name: "PageContent",
    supportedBlocks: {
        anchor: AnchorBlock,
        space: SpaceBlock,
        richtext: RichTextBlock,
        headline: HeadlineBlock,
        image: DamImageBlock,
        textImage: TextImageBlock,
        damVideo: DamVideoBlock,
        youTubeVideo: YouTubeVideoBlock,
        callToActionList: CallToActionListBlock,
    },
});
