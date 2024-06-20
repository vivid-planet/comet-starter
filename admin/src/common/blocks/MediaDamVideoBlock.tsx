import { Field, FinalFormSelect } from "@comet/admin";
import { Video } from "@comet/admin-icons";
import { BlocksFinalForm, createCompositeBlock, createCompositeSetting } from "@comet/blocks-admin";
import { DamImageBlock, DamVideoBlock } from "@comet/cms-admin";
import { MenuItem } from "@mui/material";
import { MediaDamVideoBlockData } from "@src/blocks.generated";
import { FormattedMessage } from "react-intl";

const aspectRatioOptions = [
    { label: "auto", value: "auto" },
    { label: "1:1", value: "1x1" },
    { label: "3:2", value: "3x2" },
    { label: "4:3", value: "4x3" },
    { label: "4:5", value: "4x5" },
    { label: "9:16", value: "9x16" },
    { label: "16:9", value: "16x9" },
    { label: "21:9", value: "21x9" },
];

export const MediaDamVideoBlock = createCompositeBlock({
    name: "mediaDamVideo",
    displayName: <Video />,
    blocks: {
        video: {
            block: DamVideoBlock,
        },
        aspectRatio: {
            block: createCompositeSetting<MediaDamVideoBlockData["aspectRatio"]>({
                defaultValue: "auto",
                AdminComponent: ({ state, updateState }) => {
                    return (
                        <BlocksFinalForm<Pick<MediaDamVideoBlockData, "aspectRatio">>
                            onSubmit={({ aspectRatio }) => updateState(aspectRatio)}
                            initialValues={{ aspectRatio: state }}
                        >
                            <Field name="aspectRatio" label={<FormattedMessage id="mediaDamVideo.aspectRatio" defaultMessage="Aspect Ratio" />}>
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
        previewImage: {
            block: DamImageBlock,
            title: <FormattedMessage id="mediaDamVideo.previewImage" defaultMessage="Preview Image" />,
        },
    },
});
