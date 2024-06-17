import { Field, FinalFormSwitch } from "@comet/admin";
import { BlockCategory, BlocksFinalForm, createCompositeBlock, createCompositeBlockTextField, createCompositeSetting } from "@comet/blocks-admin";
import { AccordionItemBlockData } from "@src/blocks.generated";
import { AccordionContentBlock } from "@src/common/blocks/AccordionContentBlock";
import { FormattedMessage } from "react-intl";

export const AccordionItemBlock = createCompositeBlock(
    {
        name: "AccordionItem",
        displayName: <FormattedMessage id="accordionBlock.displayName" defaultMessage="Accordion Item" />,
        blocks: {
            title: {
                block: createCompositeBlockTextField({
                    fieldProps: { fullWidth: true, label: <FormattedMessage id="accordionBlock.accordionItem.title" defaultMessage="Title" /> },
                }),
            },
            content: {
                block: AccordionContentBlock,
                title: <FormattedMessage id="accordionBlock.accordionItem.content" defaultMessage="Content" />,
            },
            openByDefault: {
                block: createCompositeSetting<AccordionItemBlockData["openByDefault"]>({
                    defaultValue: false,
                    AdminComponent: ({ state, updateState }) => {
                        return (
                            <BlocksFinalForm<{ openByDefault: typeof state }>
                                onSubmit={({ openByDefault }) => updateState(openByDefault)}
                                initialValues={{ openByDefault: state }}
                            >
                                <Field
                                    name="openByDefault"
                                    label={<FormattedMessage id="accordionBlock.accordionItem.openByDefault" defaultMessage="Open by default" />}
                                    type="checkbox"
                                    component={FinalFormSwitch}
                                />
                            </BlocksFinalForm>
                        );
                    },
                }),
                hiddenInSubroute: true,
            },
        },
    },
    (block) => {
        block.category = BlockCategory.TextAndContent;
        block.previewContent = (state) => (state.title !== undefined ? [{ type: "text", content: state.title }] : []);
        return block;
    },
);
