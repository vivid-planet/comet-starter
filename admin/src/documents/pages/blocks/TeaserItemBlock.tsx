import { createCompositeBlock, createCompositeBlockTextField } from "@comet/blocks-admin";
import { createRichTextBlock, DamImageBlock } from "@comet/cms-admin";
import { CallToActionBlock } from "@src/common/blocks/CallToActionBlock";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { FormattedMessage } from "react-intl";

const DescriptionRichTextBlock = createRichTextBlock({
    link: LinkBlock,
    rte: {
        maxBlocks: 1,
        supports: ["bold", "italic", "sub", "sup", "non-breaking-space", "soft-hyphen"],
    },
    minHeight: 0,
});

export const TeaserItemBlock = createCompositeBlock(
    {
        name: "TeaserItem",
        displayName: <FormattedMessage id="teaserItemBlock.displayName" defaultMessage="Teaser Item" />,
        blocks: {
            media: {
                block: DamImageBlock,
                title: <FormattedMessage id="teaserItemBlock.media" defaultMessage="Media" />,
            },
            title: {
                block: createCompositeBlockTextField({
                    fieldProps: { fullWidth: true, label: <FormattedMessage id="teaserItemBlock.title" defaultMessage="Title" /> },
                }),
            },
            description: {
                block: DescriptionRichTextBlock,
                title: <FormattedMessage id="teaserItemBlock.description" defaultMessage="Description" />,
            },
            callToAction: {
                block: CallToActionBlock,
            },
        },
    },
    (block) => {
        block.previewContent = (state) => [{ type: "text", content: state.title }];
        return block;
    },
);
