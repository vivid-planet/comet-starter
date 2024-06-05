import { HTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

type ButtonVariant = "Contained" | "Outlined" | "Text";

type ButtonProps = {
    variant?: ButtonVariant;
    onClick?: () => void;
    disabled?: boolean;
    children?: ReactNode;
} & (HTMLAttributes<HTMLButtonElement> | (HTMLAttributes<HTMLAnchorElement> & Pick<HTMLAnchorElement, "href" | "target">));

export const Button = ({ variant = "Outlined", disabled = false, children, ...htmlAttributes }: ButtonProps) => {
    const asHtmlElement = "href" in htmlAttributes ? "a" : "button";
    return (
        <Root as={asHtmlElement} $variant={variant} $disabled={disabled} {...htmlAttributes}>
            {children}
        </Root>
    );
};

export const Root = styled.div<{ $variant: ButtonVariant; $disabled: boolean }>`
    display: inline-flex;
    box-sizing: border-box;
    padding: ${({ theme }) => `${theme.spacing.S400} ${theme.spacing.S500}`};
    border-radius: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-out;

    text-align: center;
    text-decoration: none;
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 16px;
    font-weight: 700;
    line-height: 110%;

    ${({ theme, $variant, $disabled }) =>
        $variant === "Contained" &&
        css`
            background-color: ${theme.palette.primary.main};
            color: ${theme.palette.primary.contrastText};
            border: 1px solid ${theme.palette.primary.main};

            &:hover {
                background-color: ${theme.palette.primary.dark};
                border: 1px solid ${theme.palette.primary.dark};
            }

            ${$disabled &&
            css`
                background-color: ${theme.palette.grey["50"]};
                color: ${theme.palette.grey["400"]};
                border: 1px solid ${theme.palette.grey["200"]};
            `}
        `}

    ${({ theme, $variant, $disabled }) =>
        $variant === "Outlined" &&
        css`
            background-color: transparent;
            color: ${theme.palette.primary.main};
            border: 1px solid ${theme.palette.primary.main};

            &:hover {
                color: ${theme.palette.primary.dark};
                border: 1px solid ${theme.palette.primary.dark};
            }

            ${$disabled &&
            css`
                color: ${theme.palette.grey["300"]};
                border: 1px solid ${theme.palette.grey["200"]};
            `}
        `}
    
    ${({ theme, $variant, $disabled }) =>
        $variant === "Text" &&
        css`
            background-color: transparent;
            color: ${theme.palette.primary.main};
            border: 1px solid transparent;

            &:hover {
                color: ${theme.palette.primary.dark};
            }

            ${$disabled &&
            css`
                color: ${theme.palette.grey["300"]};
            `}
        `}
    
    ${({ $disabled }) =>
        $disabled &&
        css`
            pointer-events: none;
        `}
`;
