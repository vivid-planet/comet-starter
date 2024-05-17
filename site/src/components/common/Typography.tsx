import * as React from "react";
import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

export type TypographyVariant = "h600" | "h550" | "h500" | "h450" | "h400" | "p200" | "p100";

const TypographyVariantStyle: Record<TypographyVariant, FlattenInterpolation<ThemeProps<DefaultTheme>>> = {
    h600: css`
        font-size: 32px;
        line-height: 110%;
        font-weight: 600;
        margin-bottom: 20px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 48px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 61px;
            margin-bottom: 30px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 90px;
        }
    `,
    h550: css`
        font-size: 29px;
        line-height: 110%;
        font-weight: 600;
        margin-bottom: 12px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 39px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 48px;
            margin-bottom: 16px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 67px;
            margin-bottom: 20px;
        }
    `,
    h500: css`
        font-size: 26px;
        line-height: 110%;
        font-weight: 600;
        margin-bottom: 12px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 33px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 39px;
            margin-bottom: 16px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 50px;
            margin-bottom: 20px;
        }
    `,
    h450: css`
        font-size: 23px;
        line-height: 110%;
        font-weight: 600;
        margin-bottom: 6px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 28px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 31px;
            margin-bottom: 8px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 38px;
            margin-bottom: 10px;
        }
    `,
    h400: css`
        font-size: 20px;
        line-height: 110%;
        font-weight: 600;
        margin-bottom: 6px;

        ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
            font-size: 23px;
        }

        ${({ theme }) => theme.breakpoints.md.mediaQuery} {
            font-size: 25px;
            margin-bottom: 8px;
        }

        ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
            font-size: 28px;
            margin-bottom: 10px;
        }
    `,
    p200: css`
        font-size: 16px;
        line-height: 120%;
        font-weight: 300;
        margin-bottom: 18px;
    `,
    p100: css`
        font-size: 14px;
        line-height: 120%;
        font-weight: 300;
        margin-bottom: 10px;
    `,
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    component?: keyof HTMLElementTagNameMap;
    variant?: TypographyVariant;
    disableMargin?: boolean;
    children?: React.ReactNode;
}

export const Typography = ({ component = "div", variant = "p200", disableMargin, children, ...restProps }: TypographyProps): React.ReactElement => (
    <Text component={component} disableMargin={disableMargin} variant={variant} as={component} {...restProps}>
        {children}
    </Text>
);

const Text = styled.div<TypographyProps>`
    // TODO: add when theme is available
    // font-family: ${({ theme }) => theme.typography.fontFamily};
    ${({ variant = "p200" }) => TypographyVariantStyle[variant]};
    ${({ disableMargin }) => disableMargin && "margin-bottom: 0;"}
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
