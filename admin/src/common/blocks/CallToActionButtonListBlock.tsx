import { createListBlock } from "@comet/blocks-admin";
import { CallToActionButtonBlock } from "@src/common/blocks/CallToActionButtonBlock";
import { FormattedMessage } from "react-intl";

export const CallToActionButtonListBlock = createListBlock({
    name: "ButtonList",
    displayName: <FormattedMessage id="callToActionButtonListBlock.displayName" defaultMessage="Button List" />,
    block: CallToActionButtonBlock,
    itemName: <FormattedMessage id="callToActionButtonListBlock.itemName" defaultMessage="Button" />,
    itemsName: <FormattedMessage id="callToActionButtonListBlock.itemsName" defaultMessage="Buttons" />,
});
