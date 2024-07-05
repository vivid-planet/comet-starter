import { BlockCategory, createCompositeBlock } from "@comet/blocks-admin";
import { DamImageBlock } from "@comet/cms-admin";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import * as React from "react";
import { FormattedMessage } from "react-intl";

export const StageBlock = createCompositeBlock(
    {
        name: "Stage",
        displayName: <FormattedMessage id="stageBlock.displayName" defaultMessage="Stage" />,
        blocks: {
            media: {
                // TODO: use media block
                block: DamImageBlock,
                title: <FormattedMessage id="stageBlock.media" defaultMessage="Media" />,
                hiddenInSubroute: true,
            },
            heading: {
                block: HeadingBlock,
            },
            text: {
                block: RichTextBlock,
                title: <FormattedMessage id="stageBlock.text" defaultMessage="Text" />,
                hiddenInSubroute: true,
            },
            callToActionList: {
                block: CallToActionListBlock,
                title: <FormattedMessage id="stageBlock.callToActionList" defaultMessage="Call To Action List" />,
            },
        },
    },
    (block) => {
        block.category = BlockCategory.Teaser;
        return block;
    },
);
