import { BlockCategory, BlockInterface, createOneOfBlock } from "@comet/blocks-admin";
import { MediaDamImageBlock } from "@src/common/blocks/MediaDamImageBlock";
import { MediaDamVideoBlock } from "@src/common/blocks/MediaDamVideoBlock";
import { MediaYoutubeVideoBlock } from "@src/common/blocks/MediaYouTubeVideoBlock";
import { FormattedMessage } from "react-intl";

export const MediaBlock: BlockInterface = createOneOfBlock({
    supportedBlocks: { image: MediaDamImageBlock, damVideo: MediaDamVideoBlock, youTubeVideo: MediaYoutubeVideoBlock },
    name: "Media",
    displayName: <FormattedMessage id="mediaBlock.displayName" defaultMessage="Media" />,
    allowEmpty: false,
    variant: "toggle",
    category: BlockCategory.Media,
});
