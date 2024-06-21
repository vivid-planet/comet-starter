import { OneOfBlock, PreviewSkeleton, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { MediaBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { DamVideoBlock } from "@src/common/blocks/DamVideoBlock";
import { YouTubeVideoBlock } from "@src/common/blocks/YouTubeVideoBlock";

const supportedBlocks: SupportedBlocks = {
    image: ({ image, aspectRatio }) => <DamImageBlock data={image} aspectRatio={aspectRatio} />,
    damVideo: (data) => <DamVideoBlock data={data} />,
    youTubeVideo: (data) => <YouTubeVideoBlock data={data} />,
};

export const MediaBlock = withPreview(
    ({ data }: PropsWithData<MediaBlockData>) => {
        return (
            <PreviewSkeleton type="media" hasContent={Boolean(data)}>
                <OneOfBlock data={data} supportedBlocks={supportedBlocks} />
            </PreviewSkeleton>
        );
    },
    { label: "Media" },
);
