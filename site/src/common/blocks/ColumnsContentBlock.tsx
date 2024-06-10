import { BlocksBlock, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { ColumnsContentBlockData } from "@src/blocks.generated";
import { RichTextBlock } from "@src/common/blocks//RichTextBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";

const supportedBlocks: SupportedBlocks = {
    richtext: (props) => <RichTextBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    heading: (props) => <HeadingBlock data={props} />,
};

export const ColumnsContentBlock = withPreview(
    ({ data }: PropsWithData<ColumnsContentBlockData>) => {
        return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
    },
    { label: "Column" },
);
