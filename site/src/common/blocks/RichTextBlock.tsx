"use client";
import { hasRichTextBlockContent, PreviewSkeleton, PropsWithData, withPreview } from "@comet/cms-site";
import { LinkBlockData, RichTextBlockData } from "@src/blocks.generated";
import { Typography, TypographyProps } from "@src/common/components/Typography";
import { isValidLink } from "@src/common/helpers/HiddenIfInvalidLink";
import { PageLayout } from "@src/layout/PageLayout";
import redraft, { Renderers, TextBlockRenderFn } from "redraft";
import styled, { css } from "styled-components";

import { LinkBlock } from "./LinkBlock";

export const createTextBlockRenderFn =
    (props: TypographyProps): TextBlockRenderFn =>
    (children, { keys }) =>
        children.map((child, index) => (
            <Text key={keys[index]} {...props}>
                {child}
            </Text>
        ));

export const defaultRichTextInlineStyleMap = {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    SUB: (children, { key }) => <sub key={key}>{children}</sub>,
    SUP: (children, { key }) => <sup key={key}>{children}</sup>,
    STRIKETHROUGH: (children, { key }) => <s key={key}>{children}</s>,
};

/**
 * Define the renderers
 */
const getDefaultRenderers = (colorInverted?: boolean): Renderers => ({
    /**
     * Those callbacks will be called recursively to render a nested structure
     */
    inline: defaultRichTextInlineStyleMap,
    /**
     * Blocks receive children and depth
     * Note that children are an array of blocks with same styling,
     */
    blocks: {
        unstyled: createTextBlockRenderFn({ bottomSpacing: true, colorInverted }),
        "paragraph-standard": createTextBlockRenderFn({ bottomSpacing: true, colorInverted }),
        "paragraph-small": createTextBlockRenderFn({ variant: "p200", bottomSpacing: true, colorInverted }),
        "header-one": createTextBlockRenderFn({ variant: "h600", bottomSpacing: true, colorInverted }),
        "header-two": createTextBlockRenderFn({ variant: "h550", bottomSpacing: true, colorInverted }),
        "header-three": createTextBlockRenderFn({ variant: "h500", bottomSpacing: true, colorInverted }),
        "header-four": createTextBlockRenderFn({ variant: "h450", bottomSpacing: true, colorInverted }),
        "header-five": createTextBlockRenderFn({ variant: "h400", bottomSpacing: true, colorInverted }),
        "header-six": createTextBlockRenderFn({ variant: "h350", bottomSpacing: true, colorInverted }),
        // List
        // or depth for nested lists
        "unordered-list-item": (children, { depth, keys }) => (
            <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
                {children.map((child, index) => (
                    <Text component="li" key={keys[index]} colorInverted={colorInverted}>
                        {child}
                    </Text>
                ))}
            </ul>
        ),
        "ordered-list-item": (children, { depth, keys }) => (
            <ol key={keys.join("|")} className={`ol-level-${depth}`}>
                {children.map((child, index) => (
                    <OrderedListItem $depth={depth} component="li" key={keys[index]} colorInverted={colorInverted}>
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
});

interface RichTextBlockProps extends PropsWithData<RichTextBlockData> {
    renderers?: Renderers;
    disableLastBottomSpacing?: boolean;
    colorInverted?: boolean;
}

export const RichTextBlock = withPreview(
    ({ data, renderers, disableLastBottomSpacing, colorInverted }: RichTextBlockProps) => {
        renderers = renderers || getDefaultRenderers(colorInverted);
        const rendered = redraft(data.draftContent, renderers);

        return (
            <PreviewSkeleton title="RichText" type="rows" hasContent={hasRichTextBlockContent(data)}>
                {disableLastBottomSpacing ? <DisableLastBottomSpacing>{rendered}</DisableLastBottomSpacing> : rendered}
            </PreviewSkeleton>
        );
    },
    { label: "Rich Text" },
);

export const PageContentRichTextBlock = (props: RichTextBlockProps) => (
    <PageLayout grid>
        <PageLayoutContent>
            <RichTextBlock {...props} />
        </PageLayoutContent>
    </PageLayout>
);

const DisableLastBottomSpacing = styled.div`
    ${({ theme }) =>
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

    /* Show empty lines as spacing between paragraphs */
    &:empty:not(:first-child:last-child)::before {
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

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
`;
