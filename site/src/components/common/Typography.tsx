import { HTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

export type TypographyVariant = "h600" | "h550" | "h500" | "h450" | "h400" | "p200" | "p100";

const typographyVariantStyle: Record<TypographyVariant, ReturnType<typeof css>> = {
    h600: css`
        font-size: 32px;
        line-height: 110%;
        font-weight: 700;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 48px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 61px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 90px;
        }
    `,
    h550: css`
        font-size: 29px;
        line-height: 110%;
        font-weight: 700;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 39px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 48px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 67px;
        }
    `,
    h500: css`
        font-size: 26px;
        line-height: 110%;
        font-weight: 700;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 33px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 39px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 50px;
        }
    `,
    h450: css`
        font-size: 23px;
        line-height: 110%;
        font-weight: 700;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 28px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 31px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 38px;
        }
    `,
    h400: css`
        font-size: 20px;
        line-height: 110%;
        font-weight: 700;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 23px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 25px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 28px;
        }
    `,
    p200: css`
        font-size: 16px;
        line-height: 120%;
        font-weight: 400;
    `,
    p100: css`
        font-size: 14px;
        line-height: 120%;
        font-weight: 400;
    `,
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
    component?: keyof HTMLElementTagNameMap;
    variant?: TypographyVariant;
    color?: string;
    gutterBottom?: boolean;
    children?: ReactNode;
}

export const Typography = ({ component = "div", variant = "p200", children, ...restProps }: TypographyProps) => (
    <Text as={component} variant={variant} {...restProps}>
        {children}
    </Text>
);

interface TextProps {
    variant: TypographyVariant;
    color?: string;
    gutterBottom?: boolean;
}

const Text = styled.div<TextProps>`
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme, color }) => color || theme.palette.text.primary};
    ${({ variant }) => typographyVariantStyle[variant]};
    margin-bottom: ${({ theme, gutterBottom }) => (gutterBottom ? theme.spacing.S300 : 0)};
    margin-top: 0;
`;
