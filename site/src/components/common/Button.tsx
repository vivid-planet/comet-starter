import { HTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

type ButtonVariant = "Contained" | "Outlined" | "Text";

type ButtonProps = {
    variant?: ButtonVariant;
    onClick?: () => void;
    children?: ReactNode;
} & (HTMLAttributes<HTMLButtonElement> | (HTMLAttributes<HTMLAnchorElement> & Pick<HTMLAnchorElement, "href" | "target">));

export const Button = ({ children, variant = "Outlined", ...htmlAttributes }: ButtonProps) => {
    const asHtmlElement = "href" in htmlAttributes ? "a" : "button";
    return (
        <Root as={asHtmlElement} $variant={variant} {...htmlAttributes}>
            {children}
        </Root>
    );
};

export const Root = styled.div<{ $variant: ButtonVariant }>`
    display: inline-flex;
    box-sizing: border-box;
    padding: ${({ theme }) => `${theme.spacing.S400} ${theme.spacing.S500}`};
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-out;

    text-align: center;
    text-decoration: none;
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 16px;
    font-weight: 700;
    line-height: 110%;

    ${({ $variant }) =>
        $variant === "Contained" &&
        css`
            background-color: ${({ theme }) => theme.palette.primary.main};
            color: ${({ theme }) => theme.palette.primary.contrastText};
            border: 1px solid ${({ theme }) => theme.palette.primary.main};

            &:hover {
                background-color: ${({ theme }) => theme.palette.primary.dark};
                border: 1px solid ${({ theme }) => theme.palette.primary.dark};
            }
        `}

    ${({ $variant }) =>
        $variant === "Outlined" &&
        css`
            background-color: transparent;
            color: ${({ theme }) => theme.palette.primary.main};
            border: 1px solid ${({ theme }) => theme.palette.primary.main};

            &:hover {
                color: ${({ theme }) => theme.palette.primary.dark};
                border: 1px solid ${({ theme }) => theme.palette.primary.dark};
            }
        `}
    
    ${({ $variant }) =>
        $variant === "Text" &&
        css`
            background-color: transparent;
            color: ${({ theme }) => theme.palette.primary.main};
            border: 1px solid transparent;

            &:hover {
                color: ${({ theme }) => theme.palette.primary.dark};
            }
        `}
`;
