import { HTMLAttributes, ReactElement, ReactNode } from "react";
import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

export type TypographyVariant = "h600" | "h550" | "h500" | "h450" | "h400" | "p200" | "p100";

const TypographyVariantStyle: Record<TypographyVariant, FlattenInterpolation<ThemeProps<DefaultTheme>>> = {
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

export const Typography = ({ component = "div", children, ...restProps }: TypographyProps): ReactElement => (
    <Text as={component} {...restProps}>
        {children}
    </Text>
);

const Text = styled.div<TypographyProps>`
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme, color }) => (color ? color : theme.palette.text.primary)};
    ${({ variant = "p200" }) => TypographyVariantStyle[variant]};
    ${({ theme, gutterBottom = false }) => gutterBottom && `margin-bottom: ${theme.spacing.S300};`}
    margin-top: 0;

    white-space: pre-line;

    // Workaround when empty paragraphs are used as "spacing" in content
    &:empty {
        :before {
            white-space: pre;
            content: " ";
        }
    }
`;
