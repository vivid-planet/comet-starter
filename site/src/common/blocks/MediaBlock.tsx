import { OneOfBlock, PreviewSkeleton, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { MediaBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { DamVideoBlock } from "@src/common/blocks/DamVideoBlock";
import { YouTubeVideoBlock } from "@src/common/blocks/YouTubeVideoBlock";
import styled from "styled-components";

const supportedBlocks: SupportedBlocks = {
    image: ({ image, aspectRatio, ...props }) => <DamImageBlock data={image} aspectRatio={aspectRatio} {...props} />,
    damVideo: ({ video, aspectRatio, previewImage, ...props }) => (
        <DamVideoBlock data={video} aspectRatio={aspectRatio} previewImage={previewImage} {...props} />
    ),
    youTubeVideo: ({ video, previewImage, ...props }) => <YouTubeVideoBlock data={video} />,
};

export const MediaBlock = withPreview(
    ({ data }: PropsWithData<MediaBlockData>) => {
        return (
            <Root>
                <PreviewSkeleton type="media" hasContent={Boolean(data)}>
                    <OneOfBlock data={data} supportedBlocks={supportedBlocks} />
                </PreviewSkeleton>
            </Root>
        );
    },
    { label: "Media" },
);

// TODO: check if 100% is the right value for height and width
const Root = styled.div`
    height: 100%;
    width: 100%;
`;
