import { createListBlock } from "@comet/cms-admin";
import { TextLinkBlock } from "@src/common/blocks/TextLinkBlock";

export const LinkListBlock = createListBlock({ name: "LinkList", block: TextLinkBlock });
