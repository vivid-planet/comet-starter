import { createListBlock } from "@comet/blocks-admin";
import { StageBlock } from "@src/documents/pages/blocks/StageBlock";
import { FormattedMessage } from "react-intl";

export const StageListBlock = createListBlock({
    name: "StageList",
    displayName: <FormattedMessage id="stageListBlock.displayName" defaultMessage="Stage List" />,
    block: StageBlock,
    minVisibleBlocks: 1,
    maxVisibleBlocks: 1,
    itemName: <FormattedMessage id="stageListBlock.itemName" defaultMessage="item" />,
    itemsName: <FormattedMessage id="stageListBlock.itemsName" defaultMessage="items" />,
});
