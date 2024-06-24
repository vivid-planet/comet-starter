"use client";
import { hasRichTextBlockContent, PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { LinkBlockData, RichTextBlockData } from "@src/blocks.generated";
import { Typography } from "@src/common/components/Typography";
import { isValidLink } from "@src/common/helpers/HiddenIfInvalidLink";
import redraft, { Renderers } from "redraft";
import styled, { css } from "styled-components";

import { LinkBlock } from "./LinkBlock";

/**
 * Define the renderers
 */
export const defaultRichTextRenderers: Renderers = {
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
        unstyled: (children, { keys }) =>
            children.map((child, index) => (
                <Text key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        "paragraph-standard": (children, { keys }) =>
            children.map((child, index) => (
                <Text key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        "paragraph-small": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="p200" key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        "header-one": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h600" key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        "header-two": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h550" key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        "header-three": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h500" key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        "header-four": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h450" key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        "header-five": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h400" key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        "header-six": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h350" key={keys[index]} bottomSpacing>
                    {child}
                </Text>
            )),
        // List
        // or depth for nested lists
        "unordered-list-item": (children, { depth, keys }) => (
            <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
                {children.map((child, index) => (
                    <Text component="li" key={keys[index]}>
                        {child}
                    </Text>
                ))}
            </ul>
        ),
        "ordered-list-item": (children, { depth, keys }) => (
            <ol key={keys.join("|")} className={`ol-level-${depth}`}>
                {children.map((child, index) => (
                    <OrderedListItem $depth={depth} component="li" key={keys[index]}>
                        {child}
                    </OrderedListItem>
                ))}
            </ol>
        ),
    },
    /**
     * Entities receive children and the entity data
     */
    entities: {
        // key is the entity key value from raw
        LINK: (children, data: LinkBlockData, { key }) =>
            isValidLink(data) ? (
                <LinkBlock key={key} data={data}>
                    <InlineLink>{children}</InlineLink>
                </LinkBlock>
            ) : (
                <span>{children}</span>
            ),
    },
};

interface RichTextBlockProps extends PropsWithData<RichTextBlockData> {
    renderers?: Renderers;
    disableLastBottomSpacing?: boolean;
}

export const RichTextBlock = withPreview(
    ({ data, renderers = defaultRichTextRenderers, disableLastBottomSpacing }: RichTextBlockProps) => {
        const rendered = redraft(data.draftContent, renderers);

        return (
            <PreviewSkeleton title="RichText" type="rows" hasContent={hasRichTextBlockContent(data)}>
                <Root $disableLastBottomSpacing={disableLastBottomSpacing}>{rendered}</Root>
            </PreviewSkeleton>
        );
    },
    { label: "Rich Text" },
);

const Root = styled.div<{ $disableLastBottomSpacing?: boolean }>`
    ${({ theme, $disableLastBottomSpacing }) =>
        $disableLastBottomSpacing &&
        css`
            > *:last-child {
                margin-bottom: 0;

                ${theme.breakpoints.xs.mediaQuery} {
                    margin-bottom: 0;
                }
            }
        `};
`;

const Text = styled(Typography)`
    white-space: pre-line;

    // Show empty lines as spacing between paragraphs
    &:empty:not(:first-child:last-child):before {
        white-space: pre;
        content: " ";
    }
`;

const OrderedListItem = styled(Text)<{ $depth: number }>`
    list-style-type: ${({ $depth }) => ($depth % 3 === 1 ? "lower-alpha" : $depth % 3 === 2 ? "lower-roman" : "decimal")};
`;

const InlineLink = styled.a`
    color: ${({ theme }) => theme.palette.primary.main};
    transition: color 0.3s ease-in-out;

    &:hover {
        color: ${({ theme }) => theme.palette.primary.dark};
    }
`;
