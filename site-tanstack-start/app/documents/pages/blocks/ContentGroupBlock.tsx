import { BlocksBlock, type PropsWithData, type SupportedBlocks, withPreview } from "@comet/cms-site";
import { type ContentGroupBlockData, type ContentGroupContentBlockData } from "@app/blocks.generated";
import { PageContentAccordionBlock } from "@app/common/blocks/AccordionBlock";
import { AnchorBlock } from "@app/common/blocks/AnchorBlock";
import { PageContentMediaGalleryBlock } from "@app/common/blocks/MediaGalleryBlock";
import { PageContentRichTextBlock } from "@app/common/blocks/RichTextBlock";
import { SpaceBlock } from "@app/common/blocks/SpaceBlock";
import { PageContentStandaloneCallToActionListBlock } from "@app/common/blocks/StandaloneCallToActionListBlock";
import { PageContentStandaloneHeadingBlock } from "@app/common/blocks/StandaloneHeadingBlock";
import { StandaloneMediaBlock } from "@app/common/blocks/StandaloneMediaBlock";
import { ColumnsBlock } from "@app/documents/pages/blocks/ColumnsBlock";
import { KeyFactsBlock } from "@app/documents/pages/blocks/KeyFactsBlock";
import { TeaserBlock } from "@app/documents/pages/blocks/TeaserBlock";
import { PageLayout } from "@app/layout/PageLayout";
import { styled, css } from "styled-components";

const supportedBlocks: SupportedBlocks = {
    accordion: (props) => <PageContentAccordionBlock data={props} />,
    anchor: (props) => <AnchorBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    teaser: (props) => <TeaserBlock data={props} />,
    richtext: (props) => <PageContentRichTextBlock data={props} disableLastBottomSpacing />,
    heading: (props) => <PageContentStandaloneHeadingBlock data={props} />,
    columns: (props) => <ColumnsBlock data={props} />,
    callToActionList: (props) => <PageContentStandaloneCallToActionListBlock data={props} />,
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
