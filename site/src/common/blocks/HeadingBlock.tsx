import { PropsWithData, withPreview } from "@comet/cms-site";
import { HeadingBlockData } from "@src/blocks.generated";
import { Typography } from "@src/components/common/Typography";
import { Renderers } from "redraft";
import styled from "styled-components";

import { defaultRichTextRenderers, RichTextBlock } from "./RichTextBlock";

// Custom renderers to render unstyled content with h400 styling for eyebrow
const eyebrowRenderers: Renderers = {
    inline: defaultRichTextRenderers.inline,
    blocks: {
        unstyled: (children, { keys }) =>
            children.map((child, index) => (
                <Typography variant={"h400"} component={"h5"} key={keys[index]} gutterBottom>
                    {child}
                </Typography>
            )),
    },
};

// Custom renderers to render headline content with given html tag
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

const textAlignmentMap: Record<HeadingBlockData["textAlignment"], "left" | "center"> = {
    Left: "left",
    Center: "center",
};

export const HeadingBlock = withPreview(
    ({ data: { eyebrow, headline, htmlTag, textAlignment } }: PropsWithData<HeadingBlockData>) => {
        const headlineTag = headlineTagMap[htmlTag];
        return (
            <Root $textAlign={textAlignmentMap[textAlignment]}>
                <RichTextBlock data={eyebrow} renderers={eyebrowRenderers} />
                <RichTextBlock data={headline} renderers={getHeadlineRenderers(headlineTag)} />
            </Root>
        );
    },
    { label: "Headline" },
);

const Root = styled.div<{ $textAlign: "left" | "center" }>`
    text-align: ${({ $textAlign }) => $textAlign};
`;
