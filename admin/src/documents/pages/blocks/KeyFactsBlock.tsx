import { BlockCategory, createCompositeBlock, createListBlock } from "@comet/blocks-admin";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { KeyFactsItemBlock } from "@src/documents/pages/blocks/KeyFactsItemBlock";
import { FormattedMessage } from "react-intl";

const KeyFactsItemsBlock = createListBlock({
    name: "KeyFactsItems",
    displayName: <FormattedMessage id="keyFactsItemsBlock.displayName" defaultMessage="Key facts items" />,
    block: KeyFactsItemBlock,
    itemName: <FormattedMessage id="keyFactsItemsBlock.itemName" defaultMessage="key fact" />,
    itemsName: <FormattedMessage id="keyFactsItemsBlock.itemsName" defaultMessage="key facts" />,
});

export const KeyFactsBlock = createCompositeBlock(
    {
        name: "KeyFacts",
        displayName: <FormattedMessage id="keyFactsBlock.displayName" defaultMessage="Key Facts" />,
        blocks: {
            heading: {
                block: HeadingBlock,
            },
            items: {
                block: KeyFactsItemsBlock,
                title: <FormattedMessage id="keyFactsBlock.items" defaultMessage="Key facts" />,
            },
        },
    },
    (block) => {
        block.category = BlockCategory.TextAndContent;
        return block;
    },
);
