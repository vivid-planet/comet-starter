import { BlockCategory, createBlocksBlock, createCompositeBlock, createCompositeBlockSelectField } from "@comet/blocks-admin";
import { AnchorBlock } from "@comet/cms-admin";
import { ContentGroupBlockData } from "@src/blocks.generated";
import { AccordionBlock } from "@src/common/blocks/AccordionBlock";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { StandaloneMediaBlock } from "@src/common/blocks/StandaloneMediaBlock";
import { ColumnsBlock } from "@src/documents/pages/blocks/ColumnsBlock";
import { KeyFactsBlock } from "@src/documents/pages/blocks/KeyFactsBlock";
import { TeaserBlock } from "@src/documents/pages/blocks/TeaserBlock";
import * as React from "react";
import { FormattedMessage } from "react-intl";

const backgroundColorOptions: Array<{ value: ContentGroupBlockData["backgroundColor"]; label: string }> = [
    { value: "Default", label: "Default" },
    { value: "LightGrey", label: "Light Grey" },
    { value: "DarkGrey", label: "Dark Grey" },
];

const ContentGroupContentBlock = createBlocksBlock({
    name: "ContentGroupContent",
    supportedBlocks: {
        accordion: AccordionBlock,
        anchor: AnchorBlock,
        space: SpaceBlock,
        teaser: TeaserBlock,
        richtext: RichTextBlock,
        heading: HeadingBlock,
        columns: ColumnsBlock,
        callToActionList: CallToActionListBlock,
        keyFacts: KeyFactsBlock,
        media: StandaloneMediaBlock,
    },
});

export const ContentGroupBlock = createCompositeBlock(
    {
        name: "ContentGroup",
        displayName: <FormattedMessage id="contentGroupBlock.displayName" defaultMessage="Content Group" />,
        blocks: {
            content: {
                block: ContentGroupContentBlock,
                title: <FormattedMessage id="contentGroupBlock.content" defaultMessage="Content" />,
            },
            backgroundColor: {
                block: createCompositeBlockSelectField<ContentGroupBlockData["backgroundColor"]>({
                    defaultValue: "Default",
                    options: backgroundColorOptions,
                    fieldProps: { fullWidth: true },
                }),
                title: <FormattedMessage id="contentGroupBlock.overlay" defaultMessage="Background Color" />,
                hiddenInSubroute: true,
            },
        },
    },
    (block) => {
        block.category = BlockCategory.Layout;
        return block;
    },
);
