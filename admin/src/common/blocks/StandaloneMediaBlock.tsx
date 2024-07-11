import { SelectField } from "@comet/admin";
import { BlockCategory, BlocksFinalForm, createCompositeBlock, createCompositeSetting } from "@comet/blocks-admin";
import { MenuItem } from "@mui/material";
import { StandaloneMediaBlockData } from "@src/blocks.generated";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { FormattedMessage } from "react-intl";

const aspectRatioOptions = [
    { label: "16:9", value: "16x9" },
    { label: "4:5", value: "4x5" },
    { label: "4:3", value: "4x3" },
    { label: "3:2", value: "3x2" },
    { label: "1:1", value: "1x1" },
    { label: "2:3", value: "2x3" },
    { label: "3:4", value: "3x4" },
    { label: "9:16", value: "9x16" },
];

export const StandaloneMediaBlock = createCompositeBlock(
    {
        name: "Media",
        displayName: <FormattedMessage id="standaloneMedia.displayName" defaultMessage="Media" />,
        blocks: {
            media: {
                block: MediaBlock,
            },
            aspectRatio: {
                block: createCompositeSetting<StandaloneMediaBlockData["aspectRatio"]>({
                    defaultValue: "16x9",
                    AdminComponent: ({ state, updateState }) => {
                        return (
                            <BlocksFinalForm<Pick<StandaloneMediaBlockData, "aspectRatio">>
                                onSubmit={({ aspectRatio }) => updateState(aspectRatio)}
                                initialValues={{ aspectRatio: state }}
                            >
                                <SelectField
                                    name="aspectRatio"
                                    label={<FormattedMessage id="standaloneMedia.aspectRatio" defaultMessage="Aspect Ratio" />}
                                >
                                    {aspectRatioOptions.map((option) => (
                                        <MenuItem value={option.value} key={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </SelectField>
                            </BlocksFinalForm>
                        );
                    },
                }),
            },
        },
    },
    (block) => {
        block.category = BlockCategory.Media;
        return block;
    },
);
