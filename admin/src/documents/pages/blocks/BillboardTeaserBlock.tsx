import { BlockCategory, createCompositeBlock, createCompositeBlockSelectField } from "@comet/blocks-admin";
import { BillboardTeaserBlockData } from "@src/blocks.generated";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import * as React from "react";
import { FormattedMessage } from "react-intl";

const backgroundOpacityOptions: Array<{ value: BillboardTeaserBlockData["backgroundOpacity"]; label: string }> = [
    { value: "100", label: "100%" },
    { value: "90", label: "90%" },
    { value: "80", label: "80%" },
    { value: "70", label: "70%" },
    { value: "60", label: "60%" },
    { value: "50", label: "50%" },
    { value: "40", label: "40%" },
    { value: "30", label: "30%" },
    { value: "20", label: "20%" },
    { value: "10", label: "10%" },
];

export const BillboardTeaserBlock = createCompositeBlock(
    {
        name: "BillboardTeaser",
        displayName: <FormattedMessage id="billboardTeaserBlock.displayName" defaultMessage="Billboard Teaser" />,
        blocks: {
            media: {
                block: MediaBlock,
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
            backgroundOpacity: {
                block: createCompositeBlockSelectField<BillboardTeaserBlockData["backgroundOpacity"]>({
                    defaultValue: "50",
                    options: backgroundOpacityOptions,
                    fieldProps: { fullWidth: true },
                }),
                title: <FormattedMessage id="billboardTeaserBlock.backgroundOpacity" defaultMessage="Background Opacity" />,
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
