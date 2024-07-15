"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { HeadingBlockData } from "@src/blocks.generated";
import { Typography } from "@src/common/components/Typography";
import { PageLayout } from "@src/layout/PageLayout";
import { CSSProperties } from "react";
import { Renderers } from "redraft";
import styled from "styled-components";

import { defaultRichTextRenderers, RichTextBlock } from "./RichTextBlock";

const eyebrowRenderers: Renderers = {
    inline: defaultRichTextRenderers.inline,
};

const getHeadlineRenderers = (htmlTag: keyof HTMLElementTagNameMap): Renderers => ({
    inline: defaultRichTextRenderers.inline,
    blocks: {
        "header-one": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant="h600" component={htmlTag} key={keys[index]} bottomSpacing>
                    {child}
                </Typography>
            )),
        "header-two": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant="h550" component={htmlTag} key={keys[index]} bottomSpacing>
                    {child}
                </Typography>
            )),
        "header-three": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant="h500" component={htmlTag} key={keys[index]} bottomSpacing>
                    {child}
                </Typography>
            )),
        "header-four": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant="h450" component={htmlTag} key={keys[index]} bottomSpacing>
                    {child}
                </Typography>
            )),
        "header-five": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant="h400" component={htmlTag} key={keys[index]} bottomSpacing>
                    {child}
                </Typography>
            )),
        "header-six": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant="h350" component={htmlTag} key={keys[index]} bottomSpacing>
                    {child}
                </Typography>
            )),
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

type HeadingBlockProps = PropsWithData<HeadingBlockData>;

export const HeadingBlock = withPreview(
    ({ data: { eyebrow, headline, htmlTag, textAlignment } }: HeadingBlockProps) => {
        const headlineTag = headlineTagMap[htmlTag];

        return (
            <Root $textAlign={textAlignmentMap[textAlignment]}>
                <Typography variant="h400" component="h5" bottomSpacing>
                    <RichTextBlock data={eyebrow} renderers={eyebrowRenderers} />
                </Typography>
                <RichTextBlock data={headline} renderers={getHeadlineRenderers(headlineTag)} />
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
