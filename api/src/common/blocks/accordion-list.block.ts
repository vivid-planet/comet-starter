import { createListBlock } from "@comet/blocks-api";
import { AccordionItemBlock } from "@src/common/blocks/accordion-item.block";

export const AccordionListBlock = createListBlock({ block: AccordionItemBlock }, "AccordionList");
