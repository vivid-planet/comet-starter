import { hasRichTextBlockContent, PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { LinkBlockData, RichTextBlockData } from "@src/blocks.generated";
import { isValidLink } from "@src/common/helpers/HiddenIfInvalidLink";
import { TextLink } from "@src/components/common/TextLink";
import { Typography } from "@src/components/common/Typography";
import redraft, { Renderers } from "redraft";
import styled from "styled-components";

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
                <Text key={keys[index]} gutterBottom>
                    {child}
                </Text>
            )),
        "paragraph-standard": (children, { keys }) =>
            children.map((child, index) => (
                <Text key={keys[index]} gutterBottom>
                    {child}
                </Text>
            )),
        "paragraph-small": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="p200" key={keys[index]} gutterBottom>
                    {child}
                </Text>
            )),
        "header-one": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h600" key={keys[index]} gutterBottom>
                    {child}
                </Text>
            )),
        "header-two": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h550" key={keys[index]} gutterBottom>
                    {child}
                </Text>
            )),
        "header-three": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h500" key={keys[index]} gutterBottom>
                    {child}
                </Text>
            )),
        "header-four": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h450" key={keys[index]} gutterBottom>
                    {child}
                </Text>
            )),
        "header-five": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h400" key={keys[index]} gutterBottom>
                    {child}
                </Text>
            )),
        "header-six": (children, { keys }) =>
            children.map((child, index) => (
                <Text variant="h350" key={keys[index]} gutterBottom>
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
        LINK: (children, data: LinkBlockData, { key }) => (
            <LinkBlock key={key} data={data}>
                <TextLink disabled={!isValidLink(data)}>{children}</TextLink>
            </LinkBlock>
        ),
    },
};

interface RichTextBlockProps extends PropsWithData<RichTextBlockData> {
    renderers?: Renderers;
}

export const RichTextBlock = withPreview(
    ({ data, renderers = defaultRichTextRenderers }: RichTextBlockProps) => {
        const rendered = redraft(data.draftContent, renderers);

        return (
            <PreviewSkeleton title="RichText" type="rows" hasContent={hasRichTextBlockContent(data)}>
                {rendered}
            </PreviewSkeleton>
        );
    },
    { label: "Rich Text" },
);

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
