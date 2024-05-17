import { hasRichTextBlockContent, PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { LinkBlockData, RichTextBlockData } from "@src/blocks.generated";
import { Typography } from "@src/components/common/Typography";
import * as React from "react";
import redraft, { Renderers } from "redraft";

import { LinkBlock } from "./LinkBlock";

/**
 * Define the renderers
 */
const defaultRenderers: Renderers = {
    /**
     * Those callbacks will be called recursively to render a nested structure
     */
    inline: {
        // The key passed here is just an index based on rendering order inside a block
        BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
        ITALIC: (children, { key }) => <em key={key}>{children}</em>,
        SUB: (children, { key }) => <sub key={key}>{children}</sub>,
        SUP: (children, { key }) => <sup key={key}>{children}</sup>,
        STRIKETHROUGH: (children, { key }) => <s key={key}>{children}</s>,
    },
    /**
     * Blocks receive children and depth
     * Note that children are an array of blocks with same styling,
     */
    blocks: {
        // Paragraph
        unstyled: (children, { keys }) =>
            children.map((child, idx) => (
                <Typography component={"p"} key={keys[idx]}>
                    {child}
                </Typography>
            )),
        // Headlines
        "header-one": (children, { keys }) =>
            children.map((child, idx) => (
                <Typography variant={"h600"} component={"h1"} key={keys[idx]}>
                    {child}
                </Typography>
            )),
        "header-two": (children, { keys }) =>
            children.map((child, idx) => (
                <Typography variant={"h550"} component={"h2"} key={keys[idx]}>
                    {child}
                </Typography>
            )),
        "header-three": (children, { keys }) =>
            children.map((child, idx) => (
                <Typography variant={"h500"} component={"h3"} key={keys[idx]}>
                    {child}
                </Typography>
            )),
        "header-four": (children, { keys }) =>
            children.map((child, idx) => (
                <Typography variant={"h450"} component={"h4"} key={keys[idx]}>
                    {child}
                </Typography>
            )),
        "header-five": (children, { keys }) =>
            children.map((child, idx) => (
                <Typography variant={"h400"} component={"h5"} key={keys[idx]}>
                    {child}
                </Typography>
            )),
        // List
        // or depth for nested lists
        "unordered-list-item": (children, { depth, keys }) => (
            <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
                {children.map((child, index) => (
                    <Typography component={"li"} key={keys[index]} disableMargin>
                        {child}
                    </Typography>
                ))}
            </ul>
        ),
        "ordered-list-item": (children, { depth, keys }) => (
            <ol key={keys.join("|")} className={`ol-level-${depth}`}>
                {children.map((child, index) => (
                    <Typography component={"li"} key={keys[index]} disableMargin>
                        {child}
                    </Typography>
                ))}
            </ol>
        ),
    },
    /**
     * Entities receive children and the entity data
     */
    entities: {
        // key is the entity key value from raw
        LINK: (children, data: LinkBlockData, { key }) => {
            return (
                <LinkBlock key={key} data={data}>
                    <a>{children}</a>
                </LinkBlock>
            );
        },
    },
};

interface RichTextBlockProps extends PropsWithData<RichTextBlockData> {
    renderers?: Renderers;
}

export const RichTextBlock = withPreview(
    ({ data, renderers = defaultRenderers }: RichTextBlockProps) => {
        const rendered = redraft(data.draftContent, renderers);

        return (
            <PreviewSkeleton title={"RichText"} type={"rows"} hasContent={hasRichTextBlockContent(data)}>
                {rendered}
            </PreviewSkeleton>
        );
    },
    { label: "Rich Text" },
);
