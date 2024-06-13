import { PropsWithData, withPreview } from "@comet/cms-site";
import { AccordionItemBlockData } from "@src/blocks.generated";
import { Typography } from "@src/components/common/Typography";
import * as React from "react";
import styled, { css } from "styled-components";

import { AccordionContentBlock } from "./AccordionContentBlock";

type AccordionItemBlockProps = PropsWithData<AccordionItemBlockData>;

export const AccordionItemBlock = withPreview(
    ({ data: { title, content, openByDefault } }: AccordionItemBlockProps) => {
        const [isExpanded, setIsExpanded] = React.useState<boolean>(!!openByDefault);

        return (
            <>
                <TitleWrapper onClick={() => setIsExpanded(!isExpanded)}>
                    <Typography variant="h350">{title}</Typography>
                    <IconWrapper>
                        <PlusIcon $isExpanded={isExpanded} />
                        <MinusIcon />
                    </IconWrapper>
                </TitleWrapper>
                <ContentWrapper>
                    <ContentWrapperInner $isExpanded={isExpanded}>
                        <AccordionContentBlock data={content} />
                    </ContentWrapperInner>
                </ContentWrapper>
            </>
        );
    },
    { label: "AccordionItem" },
);

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-top: 1px solid ${({ theme }) => theme.palette.grey["300"]};
    padding: ${({ theme }) => theme.spacing.S300} 0;
`;

const IconWrapper = styled.span`
    display: inline-block;
    width: 32px;
    height: 32px;
    position: relative;
`;

const MinusIcon = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.text.primary};
`;

const PlusIcon = styled(MinusIcon)<{ $isExpanded: boolean }>`
    transform: translate(-50%, -50%) rotate(${({ $isExpanded }) => (!$isExpanded ? "90deg" : "0deg")});
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
