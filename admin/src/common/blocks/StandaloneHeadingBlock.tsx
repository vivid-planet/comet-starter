import { BlockCategory, createCompositeBlock, createCompositeBlockSelectField } from "@comet/cms-admin";
import { type StandaloneHeadingBlockData } from "@src/blocks.generated";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { FormattedMessage } from "react-intl";

export const StandaloneHeadingBlock = createCompositeBlock(
    {
        name: "StandaloneHeading",
        displayName: HeadingBlock.displayName,
        blocks: {
            heading: {
                block: HeadingBlock,
            },
            textAlignment: {
                block: createCompositeBlockSelectField<StandaloneHeadingBlockData["textAlignment"]>({
                    defaultValue: "left",
                    options: [
                        { value: "left", label: <FormattedMessage id="standaloneHeading.textAlignment.left" defaultMessage="left" /> },
                        { value: "center", label: <FormattedMessage id="standaloneHeading.textAlignment.center" defaultMessage="center" /> },
                    ],
                    fieldProps: { label: <FormattedMessage id="standaloneHeading.textAlignment" defaultMessage="Text alignment" />, fullWidth: true },
                }),
            },
        },
    },
    (block) => {
        block.category = BlockCategory.TextAndContent;
        return block;
    },
);
