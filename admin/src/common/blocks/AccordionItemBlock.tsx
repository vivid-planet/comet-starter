import { Field, FinalFormInput, FinalFormSwitch } from "@comet/admin";
import { BlockCategory, BlocksFinalForm, createCompositeBlock, createCompositeSetting } from "@comet/blocks-admin";
import { AccordionItemBlockData } from "@src/blocks.generated";
import { AccordionContentBlock } from "@src/common/blocks/AccordionContentBlock";
import { FormattedMessage } from "react-intl";

export const AccordionItemBlock = createCompositeBlock(
    {
        name: "AccordionItem",
        displayName: <FormattedMessage id="accordionBlock.displayName" defaultMessage="Accordion Item" />,
        blocks: {
            title: {
                block: createCompositeSetting<AccordionItemBlockData["title"]>({
                    defaultValue: "",
                    AdminComponent: ({ state, updateState }) => {
                        return (
                            <BlocksFinalForm<{ title: typeof state }> onSubmit={({ title }) => updateState(title)} initialValues={{ title: state }}>
                                <Field name="title" type="text" component={FinalFormInput} fullWidth />
                            </BlocksFinalForm>
                        );
                    },
                }),
                title: <FormattedMessage id="accordionBlock.accordionItem.title" defaultMessage="Title" />,
                hiddenInSubroute: true,
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
