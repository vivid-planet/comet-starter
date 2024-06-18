import { BlocksBlock, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { ColumnsContentBlockData } from "@src/blocks.generated";
import { RichTextBlock } from "@src/common/blocks//RichTextBlock";
import { AnchorBlock } from "@src/common/blocks/AnchorBlock";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";

const supportedBlocks: SupportedBlocks = {
    anchor: (props) => <AnchorBlock data={props} />,
    richtext: (props) => <RichTextBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    heading: (props) => <HeadingBlock data={props} />,
    callToActionList: (props) => <CallToActionListBlock data={props} />,
};

export const ColumnsContentBlock = withPreview(
    ({ data }: PropsWithData<ColumnsContentBlockData>) => {
        return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
    },
    { label: "Columns" },
);
