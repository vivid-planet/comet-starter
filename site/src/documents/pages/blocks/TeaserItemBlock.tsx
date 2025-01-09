import { PropsWithData, withPreview } from "@comet/cms-site";
import { TeaserItemBlockData } from "@src/blocks.generated";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { defaultRichTextInlineStyleMap, RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { Typography } from "@src/common/components/Typography";
import { SvgUse } from "@src/common/helpers/SvgUse";
import stylex from "@stylexjs/stylex";
import { Renderers } from "redraft";

import { globalTokens } from "./../../../tokens.stylex";

const descriptionRenderers: Renderers = {
    inline: defaultRichTextInlineStyleMap,
};

export const TeaserItemBlock = withPreview(
    ({ data: { media, title, description, link } }: PropsWithData<TeaserItemBlockData>) => (
        <LinkBlock data={link.link} className={stylex.props(styles.root).className}>
            <div {...stylex.props(styles.mediaMobile)}>
                <MediaBlock data={media} aspectRatio="1x1" sizes="20vw" />
            </div>
            <div {...stylex.props(styles.mediaDesktop)}>
                <MediaBlock data={media} aspectRatio="16x9" sizes="20vw" />
            </div>
            <div {...stylex.props(styles.contentContainer)}>
                <Typography variant="h350" className={stylex.props(styles.titleTypography).className}>
                    {title}
                </Typography>
                <Typography variant="p200">
                    <RichTextBlock data={description} renderers={descriptionRenderers} />
                </Typography>
                <div {...stylex.props(styles.textLinkContainer)}>
                    <SvgUse href="/assets/icons/arrow-right.svg#arrow-right" width={16} height={16} />
                    <span {...stylex.props(styles.linkText)}>{link.text}</span>
                </div>
            </div>
        </LinkBlock>
    ),
    { label: "Teaser Item" },
);

const styles = stylex.create({
    root: {
        textDecoration: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: {
            default: "row",
            "@media (min-width: 900px)": "column",
        },
        gap: { default: globalTokens.spacingS300, "@media (min-width: 900px)": globalTokens.spacingS400 },
        flexGrow: {
            default: 1,
            "@media (min-width: 900px)": "unset",
        },
        flexShrink: {
            default: 1,
            "@media (min-width: 900px)": "unset",
        },
        flexBasis: {
            default: 0,
            "@media (min-width: 900px)": "unset",
        },
    },
    mediaMobile: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: { default: "block", "@media (min-width: 600px)": "none" },
    },
    mediaDesktop: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: { default: "none", "@media (min-width: 600px)": "block" },
    },
    contentContainer: {
        flexGrow: 2,
        flexShrink: 2,
        flexBasis: 0,
    },
    titleTypography: {
        marginBottom: globalTokens.spacingS100,
    },
    textLinkContainer: {
        marginTop: globalTokens.spacingS300,
        display: "flex",
        alignItems: "center",
        gap: globalTokens.spacingS200,
        color: { default: globalTokens.primaryMain, ":hover": globalTokens.primaryDark },
        transition: "color 0.3s ease-in-out",
    },
    linkText: {
        fontFamily: globalTokens.fontFamily,
        fontSize: 16,
        fontWeight: 700,
    },
});
