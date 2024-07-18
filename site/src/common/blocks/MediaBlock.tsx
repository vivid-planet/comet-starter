import { DamVideoBlock, OneOfBlock, PreviewSkeleton, PropsWithData, SupportedBlocks, withPreview, YouTubeVideoBlock } from "@comet/cms-site";
import { MediaBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";

const getSupportedBlocks = (sizes: string, aspectRatio: string, fill?: boolean): SupportedBlocks => {
    return {
        image: (data) => <DamImageBlock data={data} sizes={sizes} aspectRatio={aspectRatio} fill={fill} />,

        // TODO: update damVideo and youTubeVideo to use the fill prop when available
        damVideo: (data) => <DamVideoBlock data={data} previewImageSizes={sizes} aspectRatio={aspectRatio} />,
        youTubeVideo: (data) => <YouTubeVideoBlock data={data} previewImageSizes={sizes} aspectRatio={aspectRatio} />,
    };
};

interface MediaBlockProps extends PropsWithData<MediaBlockData> {
    sizes?: string;
    aspectRatio: string;
    fill?: boolean;
}

export const MediaBlock = withPreview(
    ({ data, sizes = "100vw", aspectRatio, fill }: MediaBlockProps) => {
        return (
            <PreviewSkeleton type="media" hasContent={Boolean(data)}>
                <OneOfBlock data={data} supportedBlocks={getSupportedBlocks(sizes, aspectRatio, fill)} />
            </PreviewSkeleton>
        );
    },
    { label: "Media" },
);
