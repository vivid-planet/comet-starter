import { CallToActionBlockData } from "@src/blocks.generated";
import { forwardRef, HTMLAttributes, RefObject } from "react";
import styled, { css } from "styled-components";

type ButtonVariant = CallToActionBlockData["variant"];

type ButtonProps = {
    variant?: ButtonVariant;
    disabled?: boolean;
} & (HTMLAttributes<HTMLButtonElement> | (HTMLAttributes<HTMLAnchorElement> & Pick<HTMLAnchorElement, "href" | "target">));

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ variant = "Contained", disabled = false, children, ...htmlAttributes }, ref) => {
        return "href" in htmlAttributes ? (
            <StyledAnchor ref={ref as RefObject<HTMLAnchorElement>} $variant={variant} $disabled={disabled} {...htmlAttributes}>
                {children}
            </StyledAnchor>
        ) : (
            <StyledButton ref={ref as RefObject<HTMLButtonElement>} $variant={variant} disabled={disabled} {...htmlAttributes}>
                {children}
            </StyledButton>
        );
    },
);

const buttonVariantStyle: Record<ButtonVariant, ReturnType<typeof css>> = {
    Contained: css`
        ${({ theme }) => css`
            background-color: ${theme.palette.primary.main};
            color: ${theme.palette.primary.contrastText};
            border: 1px solid ${theme.palette.primary.main};

            &:hover {
                background-color: ${theme.palette.primary.dark};
                border: 1px solid ${theme.palette.primary.dark};
            }
        `}
    `,
    Outlined: css`
        ${({ theme }) => css`
            background-color: transparent;
            color: ${theme.palette.primary.main};
            border: 1px solid ${theme.palette.primary.main};

            &:hover {
                color: ${theme.palette.primary.dark};
                border: 1px solid ${theme.palette.primary.dark};
            }
        `}
    `,
    Text: css`
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

const disabledButtonVariantStyle: Record<ButtonVariant, ReturnType<typeof css>> = {
    Contained: css`
        ${({ theme }) => css`
            background-color: ${theme.palette.grey["50"]};
            color: ${theme.palette.grey["400"]};
            border: 1px solid ${theme.palette.grey["200"]};
        `}
    `,
    Outlined: css`
        ${({ theme }) => css`
            color: ${theme.palette.grey["300"]};
            border: 1px solid ${theme.palette.grey["200"]};
        `}
    `,
    Text: css`
        color: ${({ theme }) => theme.palette.grey["300"]};
    `,
};

const commonButtonStyle = css<{ $variant: ButtonVariant }>`
    display: inline-flex;
    padding: ${({ theme }) => `${theme.spacing.S400} ${theme.spacing.S500}`};
    border-radius: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-out;
    transition-property: background-color, color, border-color;

    text-align: center;
    text-decoration: none;
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 16px;
    font-weight: 700;
    line-height: 110%;

    ${({ $variant }) => buttonVariantStyle[$variant]};
`;

const StyledAnchor = styled.a<{ $variant: ButtonVariant; $disabled: boolean }>`
    ${commonButtonStyle};

    ${({ $variant, $disabled }) =>
        $disabled &&
        css`
            pointer-events: none;
            ${disabledButtonVariantStyle[$variant]};
        `}
`;

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
    ${commonButtonStyle};

    &:disabled {
        pointer-events: none;
        ${({ $variant }) => disabledButtonVariantStyle[$variant]};
    }
`;
