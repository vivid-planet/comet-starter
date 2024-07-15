import { BlockCategory, createCompositeBlock, createListBlock } from "@comet/blocks-admin";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { TeaserItemBlock } from "@src/documents/pages/blocks/TeaserItemBlock";
import { FormattedMessage } from "react-intl";

const TeaserItemsBlock = createListBlock({
    name: "TeaserItems",
    displayName: <FormattedMessage id="teaserItemsBlock.displayName" defaultMessage="Teaser items" />,
    block: TeaserItemBlock,
    itemName: <FormattedMessage id="teaserItemsBlock.itemName" defaultMessage="item" />,
    itemsName: <FormattedMessage id="teaserItemsBlock.itemsName" defaultMessage="items" />,
});

export const TeaserBlock = createCompositeBlock(
    {
        name: "Teaser",
        displayName: <FormattedMessage id="teaserBlock.displayName" defaultMessage="Teaser" />,
        blocks: {
            heading: {
                block: HeadingBlock,
            },
            items: {
                block: TeaserItemsBlock,
                title: <FormattedMessage id="teaserBlock.items" defaultMessage="Items" />,
            },
        },
    },
    (block) => {
        block.category = BlockCategory.Teaser;
        return block;
    },
);
