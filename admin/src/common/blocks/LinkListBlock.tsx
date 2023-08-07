import { createListBlock } from "@comet/blocks-admin";

import { TextLinkBlock } from "./TextLinkBlock";

export const LinkListBlock = createListBlock({ name: "LinkList", block: TextLinkBlock });
