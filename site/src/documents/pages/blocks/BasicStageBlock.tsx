"use client";
import { type PropsWithData, withPreview } from "@comet/site-nextjs";
import { type BasicStageBlockData } from "@src/blocks.generated";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { PageLayout } from "@src/layout/PageLayout";
import clsx from "clsx";

import styles from "./BasicStageBlock.module.scss";

type Alignment = "start" | "center" | "end";

export const BasicStageBlock = withPreview(
    ({ data: { media, heading, text, overlay, alignment, callToActionList } }: PropsWithData<BasicStageBlockData>) => {
        const alignmentClass = {
            start: styles.alignStart,
            center: styles.alignCenter,
            end: styles.alignEnd,
        }[alignment as Alignment];

        return (
            <PageLayout className={styles.root}>
                <div className={styles.mediaPhone}>
                    <MediaBlock data={media} aspectRatio="1x2" fill />
                </div>
                <div className={styles.mediaTablet}>
                    <MediaBlock data={media} aspectRatio="1x1" fill />
                </div>
                <div className={styles.mediaTabletLandscape}>
                    <MediaBlock data={media} aspectRatio="3x2" fill />
                </div>
                <div className={styles.mediaDesktop}>
                    <MediaBlock data={media} aspectRatio="16x9" fill />
                </div>
                <div className={styles.imageOverlay} style={{ opacity: `${overlay}%` }} />
                <PageLayout className={styles.absoluteGridRoot} grid>
                    <div className={clsx(styles.content, alignmentClass)}>
                        <HeadingBlock data={heading} />
                        <RichTextBlock data={text} />
                        <CallToActionListBlock data={callToActionList} />
                    </div>
                </PageLayout>
            </PageLayout>
        );
    },
    { label: "Stage" },
);
