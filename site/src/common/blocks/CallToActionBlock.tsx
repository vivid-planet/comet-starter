"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionBlockData } from "@src/blocks.generated";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { HiddenIfInvalidLink } from "@src/common/helpers/HiddenIfInvalidLink";
import styled, { css } from "styled-components";

import { ButtonVariant } from "../components/Button";

const buttonVariantMap: Record<CallToActionBlockData["variant"], ButtonVariant> = {
    Contained: "contained",
    Outlined: "outlined",
    Text: "text",
};

export const CallToActionBlock = withPreview(
    ({ data: { textLink, variant } }: PropsWithData<CallToActionBlockData>) => (
        <HiddenIfInvalidLink link={textLink.link}>
            <Button data={textLink.link} $variant={buttonVariantMap[variant]}>
                {textLink.text}
            </Button>
        </HiddenIfInvalidLink>
    ),
    { label: "Call To Action" },
);

const buttonVariantStyle: Record<ButtonVariant, ReturnType<typeof css>> = {
    contained: css`
        ${({ theme }) => css`
            background-color: ${theme.palette.primary.main};
            color: ${theme.palette.primary.contrastText};
            border: 1px solid ${theme.palette.primary.main};

            &:hover {
                background-color: ${theme.palette.primary.dark};
                border-color: ${theme.palette.primary.dark};
            }
        `}
    `,
    outlined: css`
        ${({ theme }) => css`
            background-color: transparent;
            color: ${theme.palette.primary.main};
            border: 1px solid ${theme.palette.primary.main};

            &:hover {
                color: ${theme.palette.primary.dark};
                border-color: ${theme.palette.primary.dark};
            }
        `}
    `,
    text: css`
        ${({ theme }) => css`
            background-color: transparent;
            color: ${theme.palette.primary.main};
            border: 1px solid transparent;

            &:hover {
                color: ${theme.palette.primary.dark};
            }
        `}
    `,
};

const Button = styled(LinkBlock)<{ $variant: ButtonVariant }>`
    display: inline-flex;
    padding: ${({ theme }) => `${theme.spacing.S400} ${theme.spacing.S500}`};
    border-radius: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out;

    text-align: center;
    text-decoration: none;
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 16px;
    font-weight: 700;
    line-height: 110%;

    ${({ $variant }) => buttonVariantStyle[$variant]};
`;
