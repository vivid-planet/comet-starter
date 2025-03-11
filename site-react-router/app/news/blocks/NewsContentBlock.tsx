import { BlocksBlock, PropsWithData, SupportedBlocks } from "@comet/cms-site";
import { NewsContentBlockData } from "@app/blocks.generated";
import { DamImageBlock } from "@app/common/blocks/DamImageBlock";
import { HeadingBlock } from "@app/common/blocks/HeadingBlock";
import { RichTextBlock } from "@app/common/blocks/RichTextBlock";

const supportedBlocks: SupportedBlocks = {
    heading: (props) => <HeadingBlock data={props} />,
    richText: (props) => <RichTextBlock data={props} />,
    image: (props) => <DamImageBlock data={props} aspectRatio="inherit" />,
};

export const NewsContentBlock = ({ data }: PropsWithData<NewsContentBlockData>) => {
    return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
};
