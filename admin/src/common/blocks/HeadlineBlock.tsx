import { BlockCategory, createCompositeBlock, createCompositeBlockSelectField } from "@comet/blocks-admin";
import { createRichTextBlock } from "@comet/cms-admin";
import { HeadlineBlockData } from "@src/blocks.generated";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { LinkBlock } from "./LinkBlock";

const RichTextBlock = createRichTextBlock({
    link: LinkBlock,
    rte: {
        maxBlocks: 1,
        supports: ["bold", "italic"],
        blocktypeMap: {},
    },
    minHeight: 0,
});

export const HeadlineBlock = createCompositeBlock({
    name: "Headline",
    displayName: <FormattedMessage id="headlineBlock.displayName" defaultMessage="Headline" />,
    category: BlockCategory.TextAndContent,
    blocks: {
        headline: {
            block: RichTextBlock,
            title: <FormattedMessage id="headlineBlock.title" defaultMessage="Headline" />,
        },
        level: {
            block: createCompositeBlockSelectField<HeadlineBlockData["level"]>({
                defaultValue: "header-one",
                options: [
                    { value: "header-one", label: <FormattedMessage id="headlineBlock.headerOne" defaultMessage="Header One" /> },
                    { value: "header-two", label: <FormattedMessage id="headlineBlock.headerTwo" defaultMessage="Header Two" /> },
                    { value: "header-three", label: <FormattedMessage id="headlineBlock.headerThree" defaultMessage="Header Three" /> },
                ],
                fieldProps: { label: <FormattedMessage id="headlineBlock.level" defaultMessage="Level" />, fullWidth: true },
            }),
        },
    },
});
