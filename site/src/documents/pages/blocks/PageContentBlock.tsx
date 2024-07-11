"use client";
import { BlocksBlock, PropsWithData, SupportedBlocks } from "@comet/cms-site";
import { PageContentBlockData } from "@src/blocks.generated";
import { PageContentAccordionBlock } from "@src/common/blocks/AccordionBlock";
import { AnchorBlock } from "@src/common/blocks/AnchorBlock";
import { PageContentCallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { PageContentHeadingBlock } from "@src/common/blocks/HeadingBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { PageContentRichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { ColumnsBlock } from "@src/documents/pages/blocks/ColumnsBlock";

const supportedBlocks: SupportedBlocks = {
    accordion: (props) => <PageContentAccordionBlock data={props} />,
    anchor: (props) => <AnchorBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    richtext: (props) => <PageContentRichTextBlock data={props} />,
    heading: (props) => <PageContentHeadingBlock data={props} />,
    columns: (props) => <ColumnsBlock data={props} />,
    callToActionList: (props) => <PageContentCallToActionListBlock data={props} />,
    media: (props) => <MediaBlock data={props} />,
};

export const PageContentBlock = ({ data }: PropsWithData<PageContentBlockData>) => {
    return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
};
