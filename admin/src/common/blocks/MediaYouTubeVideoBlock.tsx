import { createCompositeBlock, YouTubeVideoBlock } from "@comet/blocks-admin";
import { DamImageBlock } from "@comet/cms-admin";
import { FormattedMessage } from "react-intl";

export const MediaYoutubeVideoBlock = createCompositeBlock({
    name: "mediaYouTubeVideo",
    displayName: <FormattedMessage id="mediaYouTubeVideo.displayName" defaultMessage="YouTube" />,
    blocks: {
        video: {
            block: YouTubeVideoBlock,
        },
        previewImage: {
            block: DamImageBlock,
            title: <FormattedMessage id="mediaYouTubeVideo.previewImage" defaultMessage="Preview Image" />,
        },
    },
});
