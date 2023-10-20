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
        unstyled: (children, { keys }) => children.map((child, idx) => <p key={keys[idx]}>{child}</p>),
        // Headlines
        "header-one": (children, { keys }) => children.map((child, idx) => <h1 key={keys[idx]}>{child}</h1>),
        "header-two": (children, { keys }) => children.map((child, idx) => <h2 key={keys[idx]}>{child}</h2>),
        "header-three": (children, { keys }) => children.map((child, idx) => <h3 key={keys[idx]}>{child}</h3>),
        "header-four": (children, { keys }) => children.map((child, idx) => <h4 key={keys[idx]}>{child}</h4>),
        "header-five": (children, { keys }) => children.map((child, idx) => <h5 key={keys[idx]}>{child}</h5>),
        "header-six": (children, { keys }) => children.map((child, idx) => <h6 key={keys[idx]}>{child}</h6>),
        // List
        // or depth for nested lists
        "unordered-list-item": (children, { depth, keys }) => (
            <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
                {children.map((child, index) => (
                    <li key={keys[index]}>{child}</li>
                ))}
            </ul>
        ),
        "ordered-list-item": (children, { depth, keys }) => (
            <ol key={keys.join("|")} className={`ol-level-${depth}`}>
                {children.map((child, index) => (
                    <li key={keys[index]}>{child}</li>
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
                <TextWrapper>{rendered}</TextWrapper>
            </PreviewSkeleton>
        );
    },
    { label: "Rich Text" },
);

export function hasDraftContent(draftContent: RawDraftContentState): boolean {
    return !(draftContent.blocks.length == 1 && draftContent.blocks[0].text === "");
}

const TextWrapper = styled.div`
    white-space: pre-line;

    //set height on empty p to make it possible to set paragraph spaces in RTE
    &:empty {
        margin-bottom: 0;

        :before {
            white-space: pre;
            content: " ";
        }
    }
`;
