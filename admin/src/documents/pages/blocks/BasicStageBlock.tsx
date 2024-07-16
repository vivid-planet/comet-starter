import { createCompositeBlock } from "@comet/blocks-admin";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import * as React from "react";
import { FormattedMessage } from "react-intl";

export const BasicStageBlock = createCompositeBlock({
    name: "BasicStage",
    displayName: <FormattedMessage id="basicStageBlock.displayName" defaultMessage="Basic Stage" />,
    blocks: {
        media: {
            block: MediaBlock,
            title: <FormattedMessage id="basicStageBlock.media" defaultMessage="Media" />,
            hiddenInSubroute: true,
        },
        heading: {
            block: HeadingBlock,
        },
        text: {
            block: RichTextBlock,
            title: <FormattedMessage id="basicStageBlock.text" defaultMessage="Text" />,
            hiddenInSubroute: true,
        },
        callToActionList: {
            block: CallToActionListBlock,
            title: <FormattedMessage id="basicStageBlock.callToActionList" defaultMessage="Call To Action List" />,
        },
    },
});
