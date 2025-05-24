import { type PropsWithData, withPreview } from "@comet/site-nextjs";
import { type StandaloneHeadingBlockData } from "@src/blocks.generated";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { PageLayout } from "@src/layout/PageLayout";
import clsx from "clsx";

import styles from "./StandaloneHeadingBlock.module.scss";

type StandaloneHeadingBlockProps = PropsWithData<StandaloneHeadingBlockData>;

export const StandaloneHeadingBlock = withPreview(
    ({ data: { heading, textAlignment } }: StandaloneHeadingBlockProps) => {
        return (
            <div
                className={clsx(styles.root, {
                    [styles.alignLeft]: textAlignment === "left",
                    [styles.alignCenter]: textAlignment === "center",
                })}
            >
                <HeadingBlock data={heading} />
            </div>
        );
    },
    { label: "Heading" },
);

export const PageContentStandaloneHeadingBlock = (props: StandaloneHeadingBlockProps) => (
    <PageLayout grid>
        <div className={styles.pageLayoutContent}>
            <StandaloneHeadingBlock {...props} />
        </div>
    </PageLayout>
);
