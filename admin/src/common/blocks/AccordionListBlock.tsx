import { createListBlock } from "@comet/blocks-admin";
import { AccordionItemBlock } from "@src/common/blocks/AccordionItemBlock";
import { FormattedMessage } from "react-intl";

export const AccordionListBlock = createListBlock({
    name: "AccordionList",
    displayName: <FormattedMessage id="accordionListBlock.displayName" defaultMessage="Accordion List" />,
    block: AccordionItemBlock,
    itemName: <FormattedMessage id="accordionListBlock.itemName" defaultMessage="accordion" />,
    itemsName: <FormattedMessage id="accordionListBlock.itemsName" defaultMessage="accordions" />,
});
