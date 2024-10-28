import { PropsWithData, withPreview } from "@comet/cms-site";
import { TeaserItemBlockData } from "@src/blocks.generated";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { defaultRichTextInlineStyleMap, RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { Typography } from "@src/common/components/Typography";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { Renderers } from "redraft";

import styles from "./TeaserItemBlock.module.css";

const descriptionRenderers: Renderers = {
    inline: defaultRichTextInlineStyleMap,
};

export const TeaserItemBlock = withPreview(
    ({ data: { media, title, description, link } }: PropsWithData<TeaserItemBlockData>) => (
        <LinkBlock data={link.link} className={styles.root}>
            <div className={styles.mediaMobile}>
                <MediaBlock data={media} aspectRatio="1x1" sizes="20vw" />
            </div>
            <div className={styles.mediaDesktop}>
                <MediaBlock data={media} aspectRatio="16x9" sizes="20vw" />
            </div>
            <div className={styles.content}>
                <Typography variant="h350" className={styles.title}>
                    {title}
                </Typography>
                <Typography variant="p200">
                    <RichTextBlock data={description} renderers={descriptionRenderers} />
                </Typography>
                <div className={styles.textLink}>
                    <SvgUse href="/assets/icons/arrow-right.svg#arrow-right" width={16} height={16} />
                    <span className={styles.textLinkText}>{link.text}</span>
                </div>
            </div>
        </LinkBlock>
    ),
    { label: "Teaser Item" },
);
