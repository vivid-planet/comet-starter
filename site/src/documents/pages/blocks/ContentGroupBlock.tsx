import { BlocksBlock, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { ContentGroupBlockData, ContentGroupContentBlockData } from "@src/blocks.generated";
import { PageContentAccordionBlock } from "@src/common/blocks/AccordionBlock";
import { AnchorBlock } from "@src/common/blocks/AnchorBlock";
import { PageContentCallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { PageContentHeadingBlock } from "@src/common/blocks/HeadingBlock";
import { PageContentMediaGalleryBlock } from "@src/common/blocks/MediaGalleryBlock";
import { PageContentRichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { StandaloneMediaBlock } from "@src/common/blocks/StandaloneMediaBlock";
import { ColumnsBlock } from "@src/documents/pages/blocks/ColumnsBlock";
import { KeyFactsBlock } from "@src/documents/pages/blocks/KeyFactsBlock";
import { TeaserBlock } from "@src/documents/pages/blocks/TeaserBlock";
import { PageLayout } from "@src/layout/PageLayout";
import styled, { css } from "styled-components";

const supportedBlocks: SupportedBlocks = {
    accordion: (props) => <PageContentAccordionBlock data={props} />,
    anchor: (props) => <AnchorBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    teaser: (props) => <TeaserBlock data={props} />,
    richtext: (props) => <PageContentRichTextBlock data={props} disableLastBottomSpacing />,
    heading: (props) => <PageContentHeadingBlock data={props} />,
    columns: (props) => <ColumnsBlock data={props} />,
    callToActionList: (props) => <PageContentCallToActionListBlock data={props} />,
    keyFacts: (props) => <KeyFactsBlock data={props} />,
    media: (props) => <StandaloneMediaBlock data={props} />,
    mediaGallery: (props) => <PageContentMediaGalleryBlock data={props} />,
};

const ContentGroupContentBlock = withPreview(
    ({ data }: PropsWithData<ContentGroupContentBlockData>) => {
        return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
    },
    { label: "ContentGroupContent" },
);

export const ContentGroupBlock = withPreview(
    ({ data: { content, backgroundColor } }: PropsWithData<ContentGroupBlockData>) => (
        <RootPageLayout $background={backgroundColor}>
            <ContentGroupContentBlock data={content} />
        </RootPageLayout>
    ),
    { label: "ContentGroup" },
);

const RootPageLayout = styled(PageLayout)<{ $background: ContentGroupBlockData["backgroundColor"] }>`
    ${({ theme, $background }) =>
        css`
            ${$background === "lightGray" &&
            css`
                background-color: ${theme.palette.gray["100"]};
            `}

            ${$background === "darkGray" &&
            css`
                background-color: ${theme.palette.gray["900"]};
                color: ${theme.palette.text.inverted};
            `}
        `};
`;
