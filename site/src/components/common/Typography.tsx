import { HTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

export type TypographyVariant = "h600" | "h550" | "h500" | "h450" | "h400" | "h350" | "p300" | "p200";

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
    h350: css`
        font-size: 18px;
        line-height: 110%;
        font-weight: 700;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 20px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 21px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 22px;
        }
    `,
    p300: css`
        font-size: 16px;
        line-height: 120%;
        font-weight: 400;
    `,
    p200: css`
        font-size: 14px;
        line-height: 120%;
        font-weight: 400;
    `,
};

const variantToElementMap: Record<TypographyVariant, keyof HTMLElementTagNameMap> = {
    h600: "h1",
    h550: "h2",
    h500: "h3",
    h450: "h4",
    h400: "h5",
    h350: "h6",
    p300: "p",
    p200: "p",
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
    component?: keyof HTMLElementTagNameMap;
    variant?: TypographyVariant;
    gutterBottom?: boolean;
    children?: ReactNode;
}

export const Typography = ({ component, variant = "p300", children, ...restProps }: TypographyProps) => (
    <Text as={component || variantToElementMap[variant]} variant={variant} {...restProps}>
        {children}
    </Text>
);

interface TextProps {
    variant: TypographyVariant;
    gutterBottom?: boolean;
}

const Text = styled.div<TextProps>`
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.palette.text.primary};
    ${({ variant }) => typographyVariantStyle[variant]};
    margin-bottom: ${({ theme, gutterBottom }) => (gutterBottom ? theme.spacing.S300 : 0)};
    margin-top: 0;
`;
