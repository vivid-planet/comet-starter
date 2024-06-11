import { HTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

export type TypographyVariant = "h600" | "h550" | "h500" | "h450" | "h400" | "h350" | "p300" | "p200";

const typographyVariantStyle: Record<TypographyVariant, ReturnType<typeof css>> = {
    h600: css`
        font-size: 32px;
        line-height: 35px;
        font-weight: 700;
        margin-bottom: 20px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 48px;
            line-height: 53px;
            margin-bottom: 24px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 61px;
            line-height: 67px;
            margin-bottom: 32px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 90px;
            line-height: 99px;
            margin-bottom: 40px;
        }
    `,
    h550: css`
        font-size: 29px;
        line-height: 32px;
        font-weight: 700;
        margin-bottom: 18px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 39px;
            line-height: 43px;
            margin-bottom: 20px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 48px;
            line-height: 53px;
            margin-bottom: 24px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 67px;
            line-height: 74px;
            margin-bottom: 30px;
        }
    `,
    h500: css`
        font-size: 26px;
        line-height: 29px;
        font-weight: 700;
        margin-bottom: 18px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 33px;
            line-height: 36px;
            margin-bottom: 20px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 39px;
            line-height: 43px;
            margin-bottom: 24px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 50px;
            line-height: 55px;
            margin-bottom: 30px;
        }
    `,
    h450: css`
        font-size: 23px;
        line-height: 26px;
        font-weight: 700;
        margin-bottom: 16px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 28px;
            line-height: 31px;
            margin-bottom: 18px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 31px;
            line-height: 34px;
            margin-bottom: 20px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 38px;
            line-height: 42px;
            margin-bottom: 22px;
        }
    `,
    h400: css`
        font-size: 20px;
        line-height: 22px;
        font-weight: 700;
        margin-bottom: 16px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 23px;
            line-height: 25px;
            margin-bottom: 16px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 25px;
            line-height: 28px;
            margin-bottom: 18px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 28px;
            line-height: 31px;
            margin-bottom: 18px;
        }
    `,
    h350: css`
        font-size: 18px;
        line-height: 20px;
        font-weight: 700;
        margin-bottom: 16px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 20px;
            line-height: 22px;
            margin-bottom: 16px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 21px;
            line-height: 23px;
            margin-bottom: 18px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 22px;
            line-height: 24px;
            margin-bottom: 18px;
        }
    `,
    p300: css`
        font-size: 16px;
        line-height: 22px;
        font-weight: 400;
        margin-bottom: 16px;

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 17px;
            line-height: 24px;
            margin-bottom: 17px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 18px;
            line-height: 26px;
            margin-bottom: 18px;
        }
    `,
    p200: css`
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        margin-bottom: 14px;

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 15px;
            line-height: 22px;
            margin-bottom: 15px;
        }
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
    addMarginBottom?: boolean;
    children?: ReactNode;
}

export const Typography = ({ component, variant = "p300", children, ...restProps }: TypographyProps) => (
    <Text as={component || variantToElementMap[variant]} variant={variant} {...restProps}>
        {children}
    </Text>
);

interface TextProps {
    variant: TypographyVariant;
    addMarginBottom?: boolean;
}

const Text = styled.div<TextProps>`
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.palette.text.primary};
    ${({ variant }) => typographyVariantStyle[variant]};
    margin-top: 0;

    ${({ theme, addMarginBottom }) =>
        !addMarginBottom &&
        css`
            margin-bottom: 0;

            ${theme.breakpoints.xs.mediaQuery} {
                margin-bottom: 0;
            }
        `};
`;
