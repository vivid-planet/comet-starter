import { BlocksBlock, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { AccordionContentBlockData, AccordionItemBlockData } from "@src/blocks.generated";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { StandaloneCallToActionListBlock } from "@src/common/blocks/StandaloneCallToActionListBlock";
import { StandaloneHeadingBlock } from "@src/common/blocks/StandaloneHeadingBlock";
import { SvgUse } from "@src/common/helpers/SvgUse";
import clsx from "clsx";
import { useState } from "react";
import { useIntl } from "react-intl";

import { Typography } from "../components/Typography";
import styles from "./AccordionItemBlock.module.scss";

const supportedBlocks: SupportedBlocks = {
    richtext: (props) => <RichTextBlock data={props} />,
    heading: (props) => <StandaloneHeadingBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    callToActionList: (props) => <StandaloneCallToActionListBlock data={props} />,
};

const AccordionContentBlock = withPreview(
    ({ data: { blocks } }: PropsWithData<AccordionContentBlockData>) => {
        return <BlocksBlock data={{ blocks }} supportedBlocks={supportedBlocks} />;
    },
    { label: "Accordion Content" },
);

type AccordionItemBlockProps = PropsWithData<AccordionItemBlockData>;

export const AccordionItemBlock = withPreview(
    ({ data: { title, content, openByDefault } }: AccordionItemBlockProps) => {
        const intl = useIntl();
        const [isExpanded, setIsExpanded] = useState<boolean>(openByDefault);

        const ariaLabelText = isExpanded
            ? intl.formatMessage({ id: "accordionBlock.ariaLabel.expanded", defaultMessage: "Collapse accordion item" })
            : intl.formatMessage({ id: "accordionBlock.ariaLabel.collapsed", defaultMessage: "Expand accordion item" });

        return (
            <>
                <button className={styles.title} onClick={() => setIsExpanded(!isExpanded)} aria-label={ariaLabelText}>
                    <Typography variant="h350">{title}</Typography>
                    <div className={styles.icon}>
                        <SvgUse
                            href="/assets/icons/chevron-down.svg#chevron-down"
                            className={clsx(styles.animatedChevron, isExpanded && styles.animatedChevronExpanded)}
                        />
                    </div>
                </button>
                <div className={styles.content} aria-hidden={!isExpanded}>
                    <div className={clsx(styles.innerContent, isExpanded && styles.innerContentExpanded)}>
                        <AccordionContentBlock data={content} />
                    </div>
                </div>
            </>
        );
    },
    { label: "AccordionItem" },
);
