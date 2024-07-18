import { createCompositeBlock, createCompositeBlockSelectField } from "@comet/blocks-admin";
import { BasicStageBlockData } from "@src/blocks.generated";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import * as React from "react";
import { FormattedMessage } from "react-intl";

const backgroundOpacityOptions: Array<{ value: BasicStageBlockData["backgroundOpacity"]; label: string }> = [
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
        backgroundOpacity: {
            block: createCompositeBlockSelectField<BasicStageBlockData["backgroundOpacity"]>({
                defaultValue: "50",
                options: backgroundOpacityOptions,
                fieldProps: { fullWidth: true },
            }),
            title: <FormattedMessage id="basicStageBlock.backgroundOpacity" defaultMessage="Background Opacity" />,
            hiddenInSubroute: true,
        },
        alignment: {
            block: createCompositeBlockSelectField<BasicStageBlockData["alignment"]>({
                defaultValue: "left",
                options: [
                    { value: "left", label: <FormattedMessage id="basicStageBlock.alignment.left" defaultMessage="left" /> },
                    { value: "center", label: <FormattedMessage id="basicStageBlock.alignment.center" defaultMessage="center" /> },
                ],
                fieldProps: { fullWidth: true },
            }),
            title: <FormattedMessage id="basicStageBlock.alignment" defaultMessage="Alignment" />,
            hiddenInSubroute: true,
        },
        callToActionList: {
            block: CallToActionListBlock,
            title: <FormattedMessage id="basicStageBlock.callToActionList" defaultMessage="Call To Action List" />,
        },
    },
});
