import { BlocksBlock, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { AccordionContentBlockData, AccordionItemBlockData } from "@src/blocks.generated";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { StandaloneCallToActionListBlock } from "@src/common/blocks/StandaloneCallToActionListBlock";
import { StandaloneHeadingBlock } from "@src/common/blocks/StandaloneHeadingBlock";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useIntl } from "react-intl";

import { Typography } from "../components/Typography";
import { globalTokens } from "./../../tokens.stylex";

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
                <button {...stylex.props(styles.titleBase, styles.title)} onClick={() => setIsExpanded(!isExpanded)} aria-label={ariaLabelText}>
                    <Typography variant="h350">{title}</Typography>
                    <div {...stylex.props(styles.iconContainer)}>
                        <svg {...stylex.props(styles.animatedChevron, isExpanded && styles.animatedChevronOpen)}>
                            <use href="/assets/icons/chevron-down.svg#chevron-down" xlinkHref="/assets/icons/chevron-down.svg#chevron-down" />
                        </svg>
                    </div>
                </button>
                <div aria-hidden={!isExpanded}>
                    <div {...stylex.props(styles.contentWrapperInner, isExpanded && styles.contentWrapperInnerOpen)}>
                        <AccordionContentBlock data={content} />
                    </div>
                </div>
            </>
        );
    },
    { label: "AccordionItem" },
);

const styles = stylex.create({
    titleBase: {
        borderWidth: 0,
    },
    title: {
        appearance: "none",
        backgroundColor: "transparent",
        color: "inherit",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: globalTokens.gray300,
        padding: `${globalTokens.spacingS300} 0`,
    },
    iconContainer: {
        display: "inline-block",
        width: 32,
        height: 32,
        position: "relative",
    },
    animatedChevron: {
        width: "100%",
        height: "100%",
        transition: "transform 0.4s ease",
    },
    animatedChevronOpen: {
        transform: "rotate(-180deg)",
    },
    contentWrapper: {
        overflow: "hidden",
    },
    contentWrapperInnerOpen: {
        marginTop: 0,
        opacity: 1,
        transition: "margin-top 0.5s ease-out, opacity 0.3s linear 0.4s",
    },
    contentWrapperInner: {
        paddingBottom: globalTokens.spacingS300,
        marginTop: "-100%",
        opacity: 0,
        transition: "margin-top 0.8s ease-out 0.3s, opacity 0.3s linear",
    },
});
