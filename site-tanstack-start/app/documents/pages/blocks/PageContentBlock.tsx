"use client";
import { BlocksBlock, type PropsWithData, type SupportedBlocks } from "@comet/cms-site";
import { type PageContentBlockData } from "@app/blocks.generated";
import { PageContentAccordionBlock } from "@app/common/blocks/AccordionBlock";
import { AnchorBlock } from "@app/common/blocks/AnchorBlock";
import { PageContentMediaGalleryBlock } from "@app/common/blocks/MediaGalleryBlock";
import { PageContentRichTextBlock } from "@app/common/blocks/RichTextBlock";
import { SpaceBlock } from "@app/common/blocks/SpaceBlock";
import { PageContentStandaloneCallToActionListBlock } from "@app/common/blocks/StandaloneCallToActionListBlock";
import { PageContentStandaloneHeadingBlock } from "@app/common/blocks/StandaloneHeadingBlock";
import { StandaloneMediaBlock } from "@app/common/blocks/StandaloneMediaBlock";
import { BillboardTeaserBlock } from "@app/documents/pages/blocks/BillboardTeaserBlock";
import { ColumnsBlock } from "@app/documents/pages/blocks/ColumnsBlock";
import { ContentGroupBlock } from "@app/documents/pages/blocks/ContentGroupBlock";
import { KeyFactsBlock } from "@app/documents/pages/blocks/KeyFactsBlock";
import { TeaserBlock } from "@app/documents/pages/blocks/TeaserBlock";

const supportedBlocks: SupportedBlocks = {
    accordion: (props) => <PageContentAccordionBlock data={props} />,
    anchor: (props) => <AnchorBlock data={props} />,
    billboardTeaser: (props) => <BillboardTeaserBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    teaser: (props) => <TeaserBlock data={props} />,
    richtext: (props) => <PageContentRichTextBlock data={props} disableLastBottomSpacing />,
    heading: (props) => <PageContentStandaloneHeadingBlock data={props} />,
    columns: (props) => <ColumnsBlock data={props} />,
    callToActionList: (props) => <PageContentStandaloneCallToActionListBlock data={props} />,
    keyFacts: (props) => <KeyFactsBlock data={props} />,
    media: (props) => <StandaloneMediaBlock data={props} />,
    contentGroup: (props) => <ContentGroupBlock data={props} />,
    mediaGallery: (props) => <PageContentMediaGalleryBlock data={props} />,
};

export const PageContentBlock = ({ data }: PropsWithData<PageContentBlockData>) => {
    return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
};
