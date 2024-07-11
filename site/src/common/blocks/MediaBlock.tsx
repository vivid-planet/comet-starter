import { DamVideoBlock, OneOfBlock, PreviewSkeleton, PropsWithData, SupportedBlocks, withPreview, YouTubeVideoBlock } from "@comet/cms-site";
import { MediaBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";

const getSupportedBlocks = (sizes: string, aspectRatio?: string): SupportedBlocks => {
    return {
        image: (data) => <DamImageBlock data={data} sizes={sizes} aspectRatio={aspectRatio} />,
        damVideo: (data) => <DamVideoBlock data={data} previewImageSizes={sizes} aspectRatio={aspectRatio} />,
        youTubeVideo: (data) => <YouTubeVideoBlock data={data} previewImageSizes={sizes} aspectRatio={aspectRatio} />,
    };
};

interface MediaBlockProps extends PropsWithData<MediaBlockData> {
    sizes?: string;
    aspectRatio?: string;
}

export const MediaBlock = withPreview(
    ({ data, sizes = "100vw", aspectRatio }: MediaBlockProps) => {
        return (
            <PreviewSkeleton type="media" hasContent={Boolean(data)}>
                <OneOfBlock data={data} supportedBlocks={getSupportedBlocks(sizes, aspectRatio)} />
            </PreviewSkeleton>
        );
    },
    { label: "Media" },
);
