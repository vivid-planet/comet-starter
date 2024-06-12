import { PropsWithData, withPreview } from "@comet/cms-site";
import { HeadingBlockData } from "@src/blocks.generated";
import { GridRoot } from "@src/components/common/GridRoot";
import { Typography } from "@src/components/common/Typography";
import { CSSProperties } from "react";
import { Renderers } from "redraft";
import styled, { css } from "styled-components";

import { defaultRichTextRenderers, RichTextBlock } from "./RichTextBlock";

const eyebrowRenderers: Renderers = {
    inline: defaultRichTextRenderers.inline,
};

const getHeadlineRenderers = (htmlTag: keyof HTMLElementTagNameMap): Renderers => ({
    inline: defaultRichTextRenderers.inline,
    blocks: {
        "header-one": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant={"h600"} component={htmlTag} key={keys[index]} gutterBottom>
                    {child}
                </Typography>
            )),
        "header-two": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant={"h550"} component={htmlTag} key={keys[index]} gutterBottom>
                    {child}
                </Typography>
            )),
        "header-three": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant={"h500"} component={htmlTag} key={keys[index]} gutterBottom>
                    {child}
                </Typography>
            )),
        "header-four": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant={"h450"} component={htmlTag} key={keys[index]} gutterBottom>
                    {child}
                </Typography>
            )),
        "header-five": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant={"h400"} component={htmlTag} key={keys[index]} gutterBottom>
                    {child}
                </Typography>
            )),
        "header-six": (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant={"h350"} component={htmlTag} key={keys[index]} gutterBottom>
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

interface HeadingBlockProps extends PropsWithData<HeadingBlockData> {
    shouldApplyPageGridLayout?: boolean;
}

type OwnerState = {
    textAlign: CSSProperties["textAlign"];
    shouldApplyPageGridLayout: boolean;
};

export const HeadingBlock = withPreview(
    ({ data: { eyebrow, headline, htmlTag, textAlignment }, shouldApplyPageGridLayout = false }: HeadingBlockProps) => {
        const headlineTag = headlineTagMap[htmlTag];
        const ownerState: OwnerState = { textAlign: textAlignmentMap[textAlignment], shouldApplyPageGridLayout };
        const content = (
            <Root $ownerState={ownerState}>
                <Typography variant={"h400"} component={"h5"} gutterBottom>
                    <RichTextBlock data={eyebrow} renderers={eyebrowRenderers} />
                </Typography>
                <RichTextBlock data={headline} renderers={getHeadlineRenderers(headlineTag)} />
            </Root>
        );

        // TODO: move GridRoot to PageContentBlock in comet v7
        if (shouldApplyPageGridLayout) {
            return <GridRoot>{content}</GridRoot>;
        }

        return content;
    },
    { label: "Heading" },
);

const Root = styled.div<{ $ownerState: OwnerState }>`
    text-align: ${({ $ownerState }) => $ownerState.textAlign};

    ${({ $ownerState }) =>
        $ownerState.shouldApplyPageGridLayout &&
        css`
            grid-column: 3 / 23;
        `}
`;
