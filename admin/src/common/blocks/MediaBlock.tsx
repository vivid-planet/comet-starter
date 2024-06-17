import { BlockCategory, BlockInterface, createCompositeBlock, createOneOfBlock } from "@comet/blocks-admin";
import { MediaDamImageBlock } from "@src/common/blocks/MediaDamImageBlock";
import { MediaDamVideoBlock } from "@src/common/blocks/MediaDamVideoBlock";
import { MediaYoutubeVideoBlock } from "@src/common/blocks/MediaYouTubeVideoBlock";
import { FormattedMessage } from "react-intl";

const MediaContentBlock: BlockInterface = createOneOfBlock({
    supportedBlocks: { image: MediaDamImageBlock, damVideo: MediaDamVideoBlock, youTubeVideo: MediaYoutubeVideoBlock },
    name: "MediaContent",
    displayName: <FormattedMessage id="mediaContentBlock.displayName" defaultMessage="Media Content" />,
    allowEmpty: false,
    variant: "toggle",
});

export const MediaBlock = createCompositeBlock(
    {
        name: "Media",
        displayName: <FormattedMessage id="mediaBlock.displayName" defaultMessage="Media" />,
        blocks: {
            media: {
                block: MediaContentBlock,
            },
        },
    },
    (block) => {
        block.category = BlockCategory.Media;
        return block;
    },
);
