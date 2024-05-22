import { BlockCategory, createCompositeBlock, createCompositeBlockSelectField } from "@comet/blocks-admin";
import { CallToActionButtonBlockData } from "@src/blocks.generated";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { TextLinkBlock } from "./TextLinkBlock";

export const CallToActionButtonBlock = createCompositeBlock(
    {
        name: "CallToActionButton",
        displayName: <FormattedMessage id="callToActionButtonBlock.displayName" defaultMessage="Button" />,
        blocks: {
            textLink: {
                block: TextLinkBlock,
                title: <FormattedMessage id="callToActionButtonBlock.link.displayName" defaultMessage="Link" />,
            },
            variant: {
                block: createCompositeBlockSelectField<CallToActionButtonBlockData["variant"]>({
                    defaultValue: "Contained",
                    options: [
                        { value: "Contained", label: <FormattedMessage id="callToActionButtonBlock.variant.contained" defaultMessage="Contained" /> },
                        { value: "Outlined", label: <FormattedMessage id="callToActionButtonBlock.variant.outlined" defaultMessage="Outlined" /> },
                        { value: "Text", label: <FormattedMessage id="callToActionButtonBlock.variant.text" defaultMessage="Text" /> },
                    ],
                    fieldProps: { label: <FormattedMessage id="callToActionButtonBlock.variant" defaultMessage="Variant" />, fullWidth: true },
                }),
            },
        },
    },
    (block) => {
        block.category = BlockCategory.Navigation;
        return block;
    },
);
