import { createListBlock } from "@comet/blocks-api";
import { TextLinkBlock } from "@src/common/blocks/text-link.block";

export const LinkListBlock = createListBlock({ block: TextLinkBlock }, "LinkList");
