import styled, { css } from "styled-components";

export type ButtonVariant = "contained" | "outlined" | "text";

export const Button = styled.button<{ variant?: ButtonVariant }>`
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

    ${({ variant = "contained", disabled }) =>
        css`
            ${buttonVariantStyle[variant]}

            &:disabled {
                pointer-events: none;
                ${disabledButtonVariantStyle[variant]};
            }

            /* <a> doesn't support :disabled selector */
            ${disabled &&
            css`
                pointer-events: none;
                ${disabledButtonVariantStyle[variant]};
            `}
        `};
`;

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

const disabledButtonVariantStyle: Record<ButtonVariant, ReturnType<typeof css>> = {
    contained: css`
        ${({ theme }) => css`
            background-color: ${theme.palette.grey["50"]};
            color: ${theme.palette.grey["400"]};
            border-color: ${theme.palette.grey["200"]};
        `}
    `,
    outlined: css`
        ${({ theme }) => css`
            color: ${theme.palette.grey["300"]};
            border-color: ${theme.palette.grey["200"]};
        `}
    `,
    text: css`
        color: ${({ theme }) => theme.palette.grey["300"]};
    `,
};
