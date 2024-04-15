import { createListBlock } from "@comet/blocks-admin";
import { FormattedMessage } from "react-intl";

import { TextLinkBlock } from "./TextLinkBlock";

export const LinkListBlock = createListBlock({
    name: "LinkList",
    displayName: <FormattedMessage id="linkListBlock.displayName" defaultMessage="Link List" />,
    block: TextLinkBlock,
    itemName: <FormattedMessage id="linkListBlock.itemName" defaultMessage="link" />,
    itemsName: <FormattedMessage id="linkListBlock.itemsName" defaultMessage="links" />,
});
