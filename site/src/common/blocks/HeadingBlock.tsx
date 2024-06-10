import { PropsWithData, withPreview } from "@comet/cms-site";
import { HeadingBlockData } from "@src/blocks.generated";
import { Typography } from "@src/components/common/Typography";
import { pageGridLayoutStyle } from "@src/util/PageGridLayoutStyle";
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
    addPageGridLayoutStyle?: boolean;
}

type OwnerState = {
    textAlign: CSSProperties["textAlign"];
    addPageGridLayoutStyle: boolean;
};

export const HeadingBlock = withPreview(
    ({ data: { eyebrow, headline, htmlTag, textAlignment }, addPageGridLayoutStyle = false }: HeadingBlockProps) => {
        const headlineTag = headlineTagMap[htmlTag];
        const ownerState: OwnerState = { textAlign: textAlignmentMap[textAlignment], addPageGridLayoutStyle };
        return (
            <Root $ownerState={ownerState}>
                <Wrapper>
                    <Typography variant={"h400"} component={"h5"} gutterBottom>
                        <RichTextBlock data={eyebrow} renderers={eyebrowRenderers} />
                    </Typography>
                    <RichTextBlock data={headline} renderers={getHeadlineRenderers(headlineTag)} />
                </Wrapper>
            </Root>
        );
    },
    { label: "Heading" },
);

const Root = styled.div<{ $ownerState: OwnerState }>`
    ${({ $ownerState }) => $ownerState.addPageGridLayoutStyle && pageGridLayoutStyle}
    text-align: ${({ $ownerState }) => $ownerState.textAlign};
`;

const Wrapper = styled.div`
    grid-column: inherit;
`;
