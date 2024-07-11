import { BlockCategory, BlockInterface, createOneOfBlock } from "@comet/blocks-admin";
import { DamImageBlock, DamVideoBlock, YouTubeVideoBlock } from "@comet/cms-admin";
import { FormattedMessage } from "react-intl";

/*
 * TODO: replace with new implementations with optional aspectRatio and video control options and preview images when available
 */

export const MediaBlock: BlockInterface = createOneOfBlock({
    supportedBlocks: { image: DamImageBlock, damVideo: DamVideoBlock, youTubeVideo: YouTubeVideoBlock },
    name: "Media",
    displayName: <FormattedMessage id="mediaBlock.displayName" defaultMessage="Media" />,
    allowEmpty: false,
    variant: "toggle",
    category: BlockCategory.Media,
});
