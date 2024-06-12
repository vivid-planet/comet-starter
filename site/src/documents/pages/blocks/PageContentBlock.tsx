"use client";
import { BlocksBlock, PropsWithData, SupportedBlocks, YouTubeVideoBlock } from "@comet/cms-site";
import { PageContentBlockData } from "@src/blocks.generated";
import { AnchorBlock } from "@src/common/blocks/AnchorBlock";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { ColumnsBlock } from "@src/common/blocks/ColumnsBlock";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { DamVideoBlock } from "@src/common/blocks/DamVideoBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { TextImageBlock } from "@src/common/blocks/TextImageBlock";

const supportedBlocks: SupportedBlocks = {
    anchor: (props) => <AnchorBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    richtext: (props) => <RichTextBlock data={props} shouldApplyPageGridLayout />,
    heading: (props) => <HeadingBlock data={props} shouldApplyPageGridLayout />,
    image: (props) => <DamImageBlock data={props} />,
    textImage: (props) => <TextImageBlock data={props} />,
    damVideo: (props) => <DamVideoBlock data={props} />,
    youTubeVideo: (props) => <YouTubeVideoBlock data={props} />,
    columns: (props) => <ColumnsBlock data={props} />,
    callToActionList: (props) => <CallToActionListBlock data={props} />,
};

export const PageContentBlock = ({ data }: PropsWithData<PageContentBlockData>) => {
    return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
};
