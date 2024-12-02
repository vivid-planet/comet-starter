import { BlocksBlock, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { AccordionContentBlockData, AccordionItemBlockData } from "@src/blocks.generated";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { StandaloneCallToActionListBlock } from "@src/common/blocks/StandaloneCallToActionListBlock";
import { StandaloneHeadingBlock } from "@src/common/blocks/StandaloneHeadingBlock";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import styled, { css } from "styled-components";

import { Typography } from "../components/Typography";

const supportedBlocks: SupportedBlocks = {
    richtext: (props) => <RichTextBlock data={props} disableLastBottomSpacing />,
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
        const innerContentRef = useRef<HTMLDivElement>(null);
        const [isExpanded, setIsExpanded] = useState<boolean>(openByDefault);
        const [elementHeight, setElementHeight] = useState<number>(0);

        const ariaLabelText = isExpanded
            ? intl.formatMessage({ id: "accordionBlock.ariaLabel.expanded", defaultMessage: "Collapse accordion item" })
            : intl.formatMessage({ id: "accordionBlock.ariaLabel.collapsed", defaultMessage: "Expand accordion item" });

        useEffect(() => {
            const updateElementHeight = () => {
                const height = isExpanded && innerContentRef.current ? innerContentRef.current.clientHeight : 0;
                setElementHeight(height);
            };

            updateElementHeight();

            window.addEventListener("resize", updateElementHeight);
            return () => window.removeEventListener("resize", updateElementHeight);
        }, [isExpanded]);

        return (
            <>
                <TitleWrapper onClick={() => setIsExpanded(!isExpanded)} aria-label={ariaLabelText}>
                    <Typography variant="h350">{title}</Typography>
                    <IconWrapper>
                        <AnimatedChevron href="/assets/icons/chevron-down.svg#chevron-down" $isExpanded={isExpanded} />
                    </IconWrapper>
                </TitleWrapper>
                <ContentWrapper $height={elementHeight} $isExpanded={isExpanded}>
                    <ContentWrapperInner ref={innerContentRef}>
                        <AccordionContentBlock data={content} />
                    </ContentWrapperInner>
                </ContentWrapper>
            </>
        );
    },
    { label: "AccordionItem" },
);

const TitleWrapper = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;

    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-top: 1px solid ${({ theme }) => theme.palette.gray["300"]};
    padding: ${({ theme }) => theme.spacing.S300} 0;
`;

const IconWrapper = styled.div`
    display: inline-block;
    width: 32px;
    height: 32px;
    position: relative;
`;

const AnimatedChevron = styled(SvgUse)<{ $isExpanded: boolean }>`
    width: 100%;
    height: 100%;
    transform: rotate(${({ $isExpanded }) => ($isExpanded ? "-180deg" : "0deg")});
    transition: transform 0.4s ease;
`;

const ContentWrapper = styled.div<{ $height: number; $isExpanded: boolean }>`
    overflow: hidden;
    height: ${({ $height }) => $height}px;
    opacity: 0;
    transition: height 0.2s ease-out 0.2s, opacity 0.3s linear;

    ${({ $isExpanded }) =>
        $isExpanded &&
        css`
            opacity: 1;
            transition: height 0.2s ease-out, opacity 0.3s linear 0.2s;
        `}
`;

const ContentWrapperInner = styled.div`
    padding: ${({ theme }) => theme.spacing.S500} 0;
    border-top: 1px solid ${({ theme }) => theme.palette.gray["300"]};
`;
