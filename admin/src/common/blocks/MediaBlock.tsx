import { BlockCategory, BlockInterface, createCompositeBlock, createOneOfBlock, YouTubeVideoBlock } from "@comet/blocks-admin";
import { MediaDamImageBlock } from "@src/common/blocks/MediaDamImageBlock";
import { MediaDamVideoBlock } from "@src/common/blocks/MediaDamVideoBlock";
import { FormattedMessage } from "react-intl";

const MediaContentBlock: BlockInterface = createOneOfBlock({
    supportedBlocks: { image: MediaDamImageBlock, damVideo: MediaDamVideoBlock, youTubeVideo: YouTubeVideoBlock },
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
