"use client";
import { BlocksBlock, PropsWithData, SupportedBlocks, YouTubeVideoBlock } from "@comet/cms-site";
import { PageContentBlockData } from "@src/blocks.generated";
import { AnchorBlock } from "@src/common/blocks/AnchorBlock";
import { ColumnsBlock } from "@src/common/blocks/ColumnsBlock";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { DamVideoBlock } from "@src/common/blocks/DamVideoBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { LinkListBlock } from "@src/common/blocks/LinkListBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { TextImageBlock } from "@src/common/blocks/TextImageBlock";

const supportedBlocks: SupportedBlocks = {
    anchor: (props) => <AnchorBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    richtext: (props) => <RichTextBlock data={props} addPageGridLayoutStyle />,
    heading: (props) => <HeadingBlock data={props} addPageGridLayoutStyle />,
    image: (props) => <DamImageBlock data={props} />,
    textImage: (props) => <TextImageBlock data={props} />,
    damVideo: (props) => <DamVideoBlock data={props} />,
    youTubeVideo: (props) => <YouTubeVideoBlock data={props} />,
    links: (props) => <LinkListBlock data={props} />,
    columns: (props) => <ColumnsBlock data={props} />,
};

export const PageContentBlock = ({ data }: PropsWithData<PageContentBlockData>) => {
    return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
};
