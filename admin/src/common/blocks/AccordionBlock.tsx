import { createListBlock } from "@comet/blocks-admin";
import { AccordionItemBlock } from "@src/common/blocks/AccordionItemBlock";
import { FormattedMessage } from "react-intl";

export const AccordionBlock = createListBlock({
    name: "Accordion",
    displayName: <FormattedMessage id="accordionListBlock.displayName" defaultMessage="Accordion" />,
    block: AccordionItemBlock,
    itemName: <FormattedMessage id="accordionListBlock.itemName" defaultMessage="accordion item" />,
    itemsName: <FormattedMessage id="accordionListBlock.itemsName" defaultMessage="accordion items" />,
});
