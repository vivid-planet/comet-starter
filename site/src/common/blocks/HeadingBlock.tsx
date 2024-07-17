"use client";
import { hasRichTextBlockContent, PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { HeadingBlockData } from "@src/blocks.generated";
import { Typography } from "@src/common/components/Typography";
import { PageLayout } from "@src/layout/PageLayout";
import { CSSProperties } from "react";
import { Renderers } from "redraft";
import styled from "styled-components";

import { createTextBlockRenderFn, defaultRichTextInlineStyleMap, RichTextBlock } from "./RichTextBlock";

const eyebrowRenderers: Renderers = {
    inline: defaultRichTextInlineStyleMap,
};

const getHeadlineRenderers = (htmlTag: keyof HTMLElementTagNameMap, colorInverted?: boolean): Renderers => ({
    inline: defaultRichTextInlineStyleMap,
    blocks: {
        "header-one": createTextBlockRenderFn({ variant: "h600", component: htmlTag, bottomSpacing: true, colorInverted }),
        "header-two": createTextBlockRenderFn({ variant: "h550", component: htmlTag, bottomSpacing: true, colorInverted }),
        "header-three": createTextBlockRenderFn({ variant: "h500", component: htmlTag, bottomSpacing: true, colorInverted }),
        "header-four": createTextBlockRenderFn({ variant: "h450", component: htmlTag, bottomSpacing: true, colorInverted }),
        "header-five": createTextBlockRenderFn({ variant: "h400", component: htmlTag, bottomSpacing: true, colorInverted }),
        "header-six": createTextBlockRenderFn({ variant: "h350", component: htmlTag, bottomSpacing: true, colorInverted }),
    },
});

const headlineTagMap: Record<HeadingBlockData["htmlTag"], keyof HTMLElementTagNameMap> = {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
};

const textAlignmentMap: Record<HeadingBlockData["textAlignment"], CSSProperties["textAlign"]> = {
    Left: "left",
    Center: "center",
};

type HeadingBlockProps = PropsWithData<HeadingBlockData> & {
    colorInverted?: boolean;
};

export const HeadingBlock = withPreview(
    ({ data: { eyebrow, headline, htmlTag, textAlignment }, colorInverted }: HeadingBlockProps) => {
        const headlineTag = headlineTagMap[htmlTag];

        return (
            <Root $textAlign={textAlignmentMap[textAlignment]}>
                {hasRichTextBlockContent(eyebrow) && (
                    <Typography variant="h400" component="h5" bottomSpacing colorInverted={colorInverted}>
                        <RichTextBlock data={eyebrow} renderers={eyebrowRenderers} />
                    </Typography>
                )}
                <PreviewSkeleton
                    hasContent={hasRichTextBlockContent(headline)}
                    title={
                        <HeadlineSkeleton variant="h550" component="span">
                            Headline
                        </HeadlineSkeleton>
                    }
                >
                    <RichTextBlock data={headline} renderers={getHeadlineRenderers(headlineTag, colorInverted)} />
                </PreviewSkeleton>
            </Root>
        );
    },
    { label: "Heading" },
);

export const PageContentHeadingBlock = (props: HeadingBlockProps) => (
    <PageLayout grid>
        <PageLayoutContent>
            <HeadingBlock {...props} />
        </PageLayoutContent>
    </PageLayout>
);

const Root = styled.div<{ $textAlign: CSSProperties["textAlign"] }>`
    text-align: ${({ $textAlign }) => $textAlign};
`;

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
`;

const HeadlineSkeleton = styled(Typography)`
    color: inherit;
`;
