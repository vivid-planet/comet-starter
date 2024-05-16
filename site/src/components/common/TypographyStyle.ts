import { css } from "styled-components";

const TypographyStyle = {
    fontFamily: "Helvetica, sans-serif",
    variants: {
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
        buttonText: css`
            font-size: 16px;
            line-height: 110%;
            font-weight: 600;
        `,
    },
};

export { TypographyStyle };
