import { Field, FinalFormSelect } from "@comet/admin";
import { BlockCategory, BlocksFinalForm, createCompositeBlock, createCompositeSetting } from "@comet/blocks-admin";
import { createRichTextBlock } from "@comet/cms-admin";
import { MenuItem } from "@mui/material";
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
            title: "Headline",
        },
        level: {
            block: createCompositeSetting<HeadlineBlockData["level"]>({
                defaultValue: "header-one",
                AdminComponent: ({ state, updateState }) => (
                    <BlocksFinalForm<Pick<HeadlineBlockData, "level">> onSubmit={({ level }) => updateState(level)} initialValues={{ level: state }}>
                        <Field name="level" label={<FormattedMessage id="headlineBlock.level" defaultMessage="Level" />} fullWidth>
                            {(props) => (
                                <FinalFormSelect {...props}>
                                    <MenuItem value="header-one">
                                        <FormattedMessage id="headlineBlock.headerOne" defaultMessage="Header One" />
                                    </MenuItem>
                                    <MenuItem value="header-two">
                                        <FormattedMessage id="headlineBlock.headerTwo" defaultMessage="Header Two" />
                                    </MenuItem>
                                    <MenuItem value="header-three">
                                        <FormattedMessage id="headlineBlock.headerThree" defaultMessage="Header Three" />
                                    </MenuItem>
                                </FinalFormSelect>
                            )}
                        </Field>
                    </BlocksFinalForm>
                ),
            }),
        },
    },
});
