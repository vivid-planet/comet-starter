import { SelectField } from "@comet/admin";
import { BlocksFinalForm, createCompositeBlock, createCompositeSetting, YouTubeVideoBlock } from "@comet/blocks-admin";
import { DamImageBlock } from "@comet/cms-admin";
import { MenuItem } from "@mui/material";
import { MediaYoutubeVideoBlockData } from "@src/blocks.generated";
import { FormattedMessage } from "react-intl";

const aspectRatioOptions = [
    { label: "1:1", value: "1x1" },
    { label: "3:2", value: "3x2" },
    { label: "4:3", value: "4x3" },
    { label: "4:5", value: "4x5" },
    { label: "9:16", value: "9x16" },
    { label: "16:9", value: "16x9" },
    { label: "21:9", value: "21x9" },
];

export const MediaYoutubeVideoBlock = createCompositeBlock({
    name: "MediaYoutubeVideo",
    displayName: <FormattedMessage id="mediaYouTubeVideo.displayName" defaultMessage="YouTube" />,
    blocks: {
        video: {
            block: YouTubeVideoBlock,
        },
        aspectRatio: {
            block: createCompositeSetting<MediaYoutubeVideoBlockData["aspectRatio"]>({
                defaultValue: "16x9",
                AdminComponent: ({ state, updateState }) => {
                    return (
                        <BlocksFinalForm<Pick<MediaYoutubeVideoBlockData, "aspectRatio">>
                            onSubmit={({ aspectRatio }) => updateState(aspectRatio)}
                            initialValues={{ aspectRatio: state }}
                        >
                            <SelectField
                                name="aspectRatio"
                                label={<FormattedMessage id="mediaYouTubeVideo.aspectRatio" defaultMessage="Aspect Ratio" />}
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
        previewImage: {
            block: DamImageBlock,
            title: <FormattedMessage id="mediaYouTubeVideo.previewImage" defaultMessage="Preview Image" />,
        },
    },
});
