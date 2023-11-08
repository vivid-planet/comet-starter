import { PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { LinkBlockData, RichTextBlockData } from "@src/blocks.generated";
import { RawDraftContentState } from "draft-js";
import * as React from "react";
import redraft, { Renderers } from "redraft";
import styled from "styled-components";

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
    },
    /**
     * Blocks receive children and depth
     * Note that children are an array of blocks with same styling,
     */
    blocks: {
        // Paragraph
        unstyled: (children, { keys }) => children.map((child, idx) => <StyledComponent key={keys[idx]}>{child}</StyledComponent>),
        // Headlines
        "header-one": (children, { keys }) =>
            children.map((child, idx) => (
                <StyledComponent as="h1" key={keys[idx]}>
                    {child}
                </StyledComponent>
            )),
        "header-two": (children, { keys }) =>
            children.map((child, idx) => (
                <StyledComponent as="h2" key={keys[idx]}>
                    {child}
                </StyledComponent>
            )),
        "header-three": (children, { keys }) =>
            children.map((child, idx) => (
                <StyledComponent as="h3" key={keys[idx]}>
                    {child}
                </StyledComponent>
            )),
        "header-four": (children, { keys }) =>
            children.map((child, idx) => (
                <StyledComponent as="h4" key={keys[idx]}>
                    {child}
                </StyledComponent>
            )),
        "header-five": (children, { keys }) =>
            children.map((child, idx) => (
                <StyledComponent as="h5" key={keys[idx]}>
                    {child}
                </StyledComponent>
            )),
        "header-six": (children, { keys }) =>
            children.map((child, idx) => (
                <StyledComponent as="h6" key={keys[idx]}>
                    {child}
                </StyledComponent>
            )),
        // List
        // or depth for nested lists
        "unordered-list-item": (children, { depth, keys }) => (
            <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
                {children.map((child, index) => (
                    <StyledComponent as="li" key={keys[index]}>
                        {child}
                    </StyledComponent>
                ))}
            </ul>
        ),
        "ordered-list-item": (children, { depth, keys }) => (
            <ol key={keys.join("|")} className={`ol-level-${depth}`}>
                {children.map((child, index) => (
                    <StyledComponent as="li" key={keys[index]}>
                        {child}
                    </StyledComponent>
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
    ({ data: { draftContent }, renderers = defaultRenderers }: RichTextBlockProps) => {
        const rendered = redraft(draftContent, renderers);

        return (
            <PreviewSkeleton title={"RichText"} type={"rows"} hasContent={hasDraftContent(draftContent as RawDraftContentState)}>
                {rendered}
            </PreviewSkeleton>
        );
    },
    { label: "Rich Text" },
);

export function hasDraftContent(draftContent: RawDraftContentState): boolean {
    return !(draftContent.blocks.length == 1 && draftContent.blocks[0].text === "");
}

const StyledComponent = styled.p`
    white-space: pre-line;

    &:empty {
        margin-bottom: 0;

        :before {
            white-space: pre;
            content: " ";
        }
    }
`;
