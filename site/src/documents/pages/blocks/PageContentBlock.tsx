"use client";
import { BlocksBlock, PropsWithData, SupportedBlocks, YouTubeVideoBlock } from "@comet/cms-site";
import { PageContentBlockData } from "@src/blocks.generated";
import { AccordionBlock } from "@src/common/blocks/AccordionBlock";
import { AnchorBlock } from "@src/common/blocks/AnchorBlock";
import { PageContentCallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { ColumnsBlock } from "@src/common/blocks/ColumnsBlock";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { DamVideoBlock } from "@src/common/blocks/DamVideoBlock";
import { PageContentHeadingBlock } from "@src/common/blocks/HeadingBlock";
import { PageContentRichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { TextImageBlock } from "@src/common/blocks/TextImageBlock";

const supportedBlocks: SupportedBlocks = {
    accordion: (props) => <AccordionBlock data={props} />,
    anchor: (props) => <AnchorBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    richtext: (props) => <PageContentRichTextBlock data={props} />,
    heading: (props) => <PageContentHeadingBlock data={props} />,
    image: (props) => <DamImageBlock data={props} />,
    textImage: (props) => <TextImageBlock data={props} />,
    damVideo: (props) => <DamVideoBlock data={props} />,
    youTubeVideo: (props) => <YouTubeVideoBlock data={props} />,
    columns: (props) => <ColumnsBlock data={props} />,
    callToActionList: (props) => <PageContentCallToActionListBlock data={props} />,
};

export const PageContentBlock = ({ data }: PropsWithData<PageContentBlockData>) => {
    return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
};
