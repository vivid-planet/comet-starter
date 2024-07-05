import { BlockCategory, createCompositeBlock } from "@comet/blocks-admin";
import { DamImageBlock } from "@comet/cms-admin";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import * as React from "react";
import { FormattedMessage } from "react-intl";

export const BillboardTeaserBlock = createCompositeBlock(
    {
        name: "BillboardTeaser",
        displayName: <FormattedMessage id="billboardTeaserBlock.displayName" defaultMessage="Billboard Teaser" />,
        blocks: {
            media: {
                // TODO: use media block
                block: DamImageBlock,
                title: <FormattedMessage id="billboardTeaserBlock.media" defaultMessage="Media" />,
                hiddenInSubroute: true,
            },
            heading: {
                block: HeadingBlock,
            },
            text: {
                block: RichTextBlock,
                title: <FormattedMessage id="billboardTeaserBlock.text" defaultMessage="Text" />,
                hiddenInSubroute: true,
            },
            callToActionList: {
                block: CallToActionListBlock,
                title: <FormattedMessage id="billboardTeaserBlock.callToActionList" defaultMessage="Call To Action List" />,
            },
        },
    },
    (block) => {
        block.category = BlockCategory.Teaser;
        return block;
    },
);
