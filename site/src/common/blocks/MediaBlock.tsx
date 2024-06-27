import { OneOfBlock, PreviewSkeleton, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { MediaBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { DamVideoBlock } from "@src/common/blocks/DamVideoBlock";
import { YouTubeVideoBlock } from "@src/common/blocks/YouTubeVideoBlock";

const getSupportedBlocks = (sizes: string): SupportedBlocks => {
    return {
        image: ({ image, aspectRatio }) => <DamImageBlock data={image} aspectRatio={aspectRatio} layout={{ variant: "responsive", sizes: sizes }} />,
        damVideo: (data) => <DamVideoBlock data={data} sizes={sizes} />,
        youTubeVideo: (data) => <YouTubeVideoBlock data={data} sizes={sizes} />,
    };
};

interface MediaBlockProps extends PropsWithData<MediaBlockData> {
    sizes?: string;
}

export const MediaBlock = withPreview(
    ({ data, sizes = "100vw" }: MediaBlockProps) => {
        return (
            <PreviewSkeleton type="media" hasContent={Boolean(data)}>
                <OneOfBlock data={data} supportedBlocks={getSupportedBlocks(sizes)} />
            </PreviewSkeleton>
        );
    },
    { label: "Media" },
);
