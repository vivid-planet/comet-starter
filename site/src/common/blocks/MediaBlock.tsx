import { OneOfBlock, PreviewSkeleton, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { MediaBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { DamVideoBlock } from "@src/common/blocks/DamVideoBlock";
import { YouTubeVideoBlock } from "@src/common/blocks/YouTubeVideoBlock";

const getSupportedBlocks = (sizes: string, aspectRatio?: string): SupportedBlocks => {
    return {
        image: (data) => <DamImageBlock data={data} layout={"responsive"} sizes={sizes} aspectRatio={aspectRatio} />,
        damVideo: (data) => <DamVideoBlock data={data} sizes={sizes} aspectRatio={aspectRatio} />,
        youTubeVideo: (data) => <YouTubeVideoBlock data={data} sizes={sizes} aspectRatio={aspectRatio} />,
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
