import { Field, FinalFormInput } from "@comet/admin";
import { BlocksFinalForm, createCompositeBlock, createCompositeSettings } from "@comet/blocks-admin";
import { createRichTextBlock, SvgImageBlock } from "@comet/cms-admin";
import { KeyFactsItemBlockData } from "@src/blocks.generated";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { FormattedMessage } from "react-intl";

const DescriptionRichTextBlock = createRichTextBlock({
    link: LinkBlock,
    rte: {
        maxBlocks: 1,
        supports: ["bold", "italic", "sub", "sup", "non-breaking-space", "soft-hyphen"],
    },
    minHeight: 0,
});

export const KeyFactsItemBlock = createCompositeBlock(
    {
        name: "KeyFactsItem",
        displayName: <FormattedMessage id="keyFactsItemBlock.displayName" defaultMessage="Key Fact" />,
        blocks: {
            icon: {
                block: SvgImageBlock,
                title: <FormattedMessage id="keyFactsItemBlock.icon" defaultMessage="Icon" />,
            },
            $settings: {
                block: createCompositeSettings<Pick<KeyFactsItemBlockData, "fact" | "label">>({
                    defaultValues: { fact: "", label: "" },
                    AdminComponent: ({ state, updateState }) => {
                        return (
                            <BlocksFinalForm onSubmit={updateState} initialValues={state}>
                                <Field
                                    name="fact"
                                    type="text"
                                    component={FinalFormInput}
                                    fullWidth
                                    label={<FormattedMessage id="keyFactsItemBlock.fact" defaultMessage="Fact" />}
                                />
                                <Field
                                    name="label"
                                    type="text"
                                    component={FinalFormInput}
                                    fullWidth
                                    label={<FormattedMessage id="keyFactsItemBlock.label" defaultMessage="Label" />}
                                />
                            </BlocksFinalForm>
                        );
                    },
                }),
            },
            description: {
                block: DescriptionRichTextBlock,
                title: <FormattedMessage id="keyFactsItemBlock.description" defaultMessage="Description" />,
            },
        },
    },
    (block) => {
        block.previewContent = (state) => [{ type: "text", content: state.fact }];
        return block;
    },
);
