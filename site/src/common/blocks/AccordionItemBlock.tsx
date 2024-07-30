import { BlocksBlock, PropsWithData, SupportedBlocks, withPreview } from "@comet/cms-site";
import { AccordionContentBlockData, AccordionItemBlockData } from "@src/blocks.generated";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { SpaceBlock } from "@src/common/blocks/SpaceBlock";
import { SvgUse } from "@src/common/helpers/SvgUse";
import * as React from "react";
import { useIntl } from "react-intl";
import styled, { css } from "styled-components";

import { Typography } from "../components/Typography";

const supportedBlocks: SupportedBlocks = {
    richtext: (props) => <RichTextBlock data={props} />,
    heading: (props) => <HeadingBlock data={props} />,
    space: (props) => <SpaceBlock data={props} />,
    callToActionList: (props) => <CallToActionListBlock data={props} />,
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
        const [isExpanded, setIsExpanded] = React.useState<boolean>(openByDefault);

        const ariaLabelText = isExpanded
            ? intl.formatMessage({ id: "accordionBlock.ariaLabel.expanded", defaultMessage: "Collapse accordion item" })
            : intl.formatMessage({ id: "accordionBlock.ariaLabel.collapsed", defaultMessage: "Expand accordion item" });

        return (
            <>
                <TitleWrapper onClick={() => setIsExpanded(!isExpanded)} aria-label={ariaLabelText}>
                    <Typography variant="h350">{title}</Typography>
                    <IconWrapper>
                        <AnimatedChevron href="/assets/icons/chevron-down.svg#chevron-down" $isExpanded={isExpanded} />
                    </IconWrapper>
                </TitleWrapper>
                <ContentWrapper aria-hidden={!isExpanded}>
                    <ContentWrapperInner $isExpanded={isExpanded}>
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

    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-top: 1px solid ${({ theme }) => theme.palette.grey["300"]};
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

const ContentWrapper = styled.div`
    overflow: hidden;
`;

const ContentWrapperInner = styled.div<{ $isExpanded: boolean }>`
    padding-bottom: ${({ theme }) => theme.spacing.S300};
    margin-top: -100%;
    opacity: 0;
    transition: margin-top 0.8s ease-out 0.3s, opacity 0.3s linear;

    ${({ $isExpanded }) =>
        $isExpanded &&
        css`
            margin-top: 0;
            opacity: 1;
            transition: margin-top 0.5s ease-out, opacity 0.3s linear 0.4s;
        `}
`;
