import { Field, FinalFormSelect } from "@comet/admin";
import { BlocksFinalForm, createCompositeBlock, createCompositeSetting } from "@comet/blocks-admin";
import { DamImageBlock } from "@comet/cms-admin";
import { MenuItem } from "@mui/material";
import { MediaDamImageBlockData } from "@src/blocks.generated";
import { FormattedMessage } from "react-intl";

const aspectRatioOptions = [
    { label: "1:1", value: "1x1" },
    { label: "2:3", value: "2x3" },
    { label: "3:2", value: "3x2" },
    { label: "3:4", value: "3x4" },
    { label: "4:3", value: "4x3" },
    { label: "16:9", value: "16x9" },
];

export const MediaDamImageBlock = createCompositeBlock({
    name: "MediaDamImage",
    displayName: <FormattedMessage id="mediaDamImage.displayName" defaultMessage="Image" />,
    blocks: {
        image: {
            block: DamImageBlock,
        },
        aspectRatio: {
            block: createCompositeSetting<MediaDamImageBlockData["aspectRatio"]>({
                defaultValue: "3x2",
                AdminComponent: ({ state, updateState }) => {
                    return (
                        <BlocksFinalForm<Pick<MediaDamImageBlockData, "aspectRatio">>
                            onSubmit={({ aspectRatio }) => updateState(aspectRatio)}
                            initialValues={{ aspectRatio: state }}
                        >
                            <Field name="aspectRatio" label={<FormattedMessage id="mediaDamImage.aspectRatio" defaultMessage="Aspect Ratio" />}>
                                {(props) => (
                                    <FinalFormSelect {...props}>
                                        {aspectRatioOptions.map((option) => (
                                            <MenuItem value={option.value} key={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </FinalFormSelect>
                                )}
                            </Field>
                        </BlocksFinalForm>
                    );
                },
            }),
        },
    },
});
