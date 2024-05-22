import { createBlocksBlock, YouTubeVideoBlock } from "@comet/blocks-api";
import { AnchorBlock, DamImageBlock, DamVideoBlock } from "@comet/cms-api";
import { CallToActionButtonBlock } from "@src/common/blocks/call-to-action-button.block";
import { CallToActionButtonListBlock } from "@src/common/blocks/call-to-action-button-list.block";
import { HeadlineBlock } from "@src/common/blocks/headline.block";
import { LinkListBlock } from "@src/common/blocks/link-list.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";
import { TextImageBlock } from "@src/common/blocks/text-image.block";

export const PageContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            anchor: AnchorBlock,
            space: SpaceBlock,
            richtext: RichTextBlock,
            headline: HeadlineBlock,
            image: DamImageBlock,
            textImage: TextImageBlock,
            damVideo: DamVideoBlock,
            youTubeVideo: YouTubeVideoBlock,
            links: LinkListBlock,
            callToActionButton: CallToActionButtonBlock,
            callToActionButtonList: CallToActionButtonListBlock,
        },
    },
    "PageContent",
);
