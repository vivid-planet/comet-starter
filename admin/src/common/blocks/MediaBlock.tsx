import { BlockCategory, BlockInterface, createOneOfBlock, YouTubeVideoBlock } from "@comet/blocks-admin";
import { DamImageBlock, DamVideoBlock } from "@comet/cms-admin";
import { FormattedMessage } from "react-intl";

export const MediaBlock: BlockInterface = createOneOfBlock({
    supportedBlocks: { image: DamImageBlock, damVideo: DamVideoBlock, youTubeVideo: YouTubeVideoBlock },
    name: "Media",
    displayName: <FormattedMessage id="mediaBlock.displayName" defaultMessage="Media" />,
    allowEmpty: false,
    variant: "toggle",
    category: BlockCategory.Media,
});
