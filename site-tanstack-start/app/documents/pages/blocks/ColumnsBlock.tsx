import { BlocksBlock, type PropsWithData, type SupportedBlocks, withPreview } from "@comet/cms-site";
import { type ColumnsBlockData, type ColumnsContentBlockData } from "@app/blocks.generated";
import { AccordionBlock } from "@app/common/blocks/AccordionBlock";
import { AnchorBlock } from "@app/common/blocks/AnchorBlock";
import { MediaGalleryBlock } from "@app/common/blocks/MediaGalleryBlock";
import { RichTextBlock } from "@app/common/blocks/RichTextBlock";
import { SpaceBlock } from "@app/common/blocks/SpaceBlock";
import { StandaloneCallToActionListBlock } from "@app/common/blocks/StandaloneCallToActionListBlock";
import { StandaloneHeadingBlock } from "@app/common/blocks/StandaloneHeadingBlock";
import { StandaloneMediaBlock } from "@app/common/blocks/StandaloneMediaBlock";
import { PageLayout } from "@app/layout/PageLayout";
import { styled, css } from "styled-components";

const supportedBlocks: SupportedBlocks = {
    accordion: (props) => <AccordionBlock data={props} />,
    anchor: (props) => <AnchorBlock data={props} />,
    richtext: (props) => <RichTextBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    heading: (props) => <StandaloneHeadingBlock data={props} />,
    callToActionList: (props) => <StandaloneCallToActionListBlock data={props} />,
    media: (props) => <StandaloneMediaBlock data={props} />,
    mediaGallery: (props) => <MediaGalleryBlock data={props} />,
};

const ColumnsContentBlock = withPreview(
    ({ data }: PropsWithData<ColumnsContentBlockData>) => {
        return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
    },
    { label: "Columns" },
);

export const ColumnsBlock = withPreview(
    ({ data: { columns, layout } }: PropsWithData<ColumnsBlockData>) => (
        <PageLayout grid>
            {columns.map((column) => (
                <Column $layout={layout} key={column.key}>
                    <ColumnsContentBlock data={column.props} />
                </Column>
            ))}
        </PageLayout>
    ),
    { label: "Columns" },
);

const Column = styled.div<{ $layout: string }>`
    grid-column: 3 / -3;

    ${({ $layout, theme }) =>
        $layout === "9-6-9" &&
        css`
            grid-column: 5 / -5;

            ${theme.breakpoints.xs.mediaQuery} {
                grid-column: 7 / -7;
            }
            ${theme.breakpoints.sm.mediaQuery} {
                grid-column: 8 / -8;
            }
            ${theme.breakpoints.md.mediaQuery} {
                grid-column: 9 / -9;
            }
            ${theme.breakpoints.lg.mediaQuery} {
                grid-column: 10 / -10;
            }
        `};

    ${({ theme }) => theme.breakpoints.xs.mediaQuery} {
        ${({ $layout }) =>
            $layout === "4-16-4" &&
            css`
                grid-column: 5 / -5;
            `};
        ${({ $layout }) =>
            $layout === "9-9" &&
            css`
                grid-column: 3 / 12;

                &:nth-child(even) {
                    grid-column: 14 / 23;
                }
            `};
        ${({ $layout }) =>
            $layout === "12-6" &&
            css`
                grid-column: 3 / 15;

                &:nth-child(even) {
                    grid-column: 17 / 23;
                }
            `};
        ${({ $layout }) =>
            $layout === "6-12" &&
            css`
                grid-column: 3 / 9;

                &:nth-child(even) {
                    grid-column: 11 / 23;
                }
            `};
    }
`;
