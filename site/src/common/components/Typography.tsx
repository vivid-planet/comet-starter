import { breakpoints, font } from "@src/constants.yak";
import { css, styled } from "next-yak";
import { ComponentProps } from "react";

type TypographyVariant = "h600" | "h550" | "h500" | "h450" | "h400" | "h350" | "p300" | "p200";

const variantToElementMap: Record<TypographyVariant, "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"> = {
    h600: "h1",
    h550: "h2",
    h500: "h3",
    h450: "h4",
    h400: "h5",
    h350: "h6",
    p300: "p",
    p200: "p",
};

export const Typography = styled.div.attrs<{
    as?: unknown;
    variant?: TypographyVariant;
    bottomSpacing?: boolean;
}>((props) => ({ as: props.as ?? variantToElementMap[props.variant ?? "p300"] }))`
    font-family: ${font.fontFamily};
    margin-top: 0;

    ${({ variant = "p300" }) =>
        variant == "h600"
            ? css`
                  font-size: 32px;
                  line-height: 35px;
                  font-weight: 700;
                  margin-bottom: 20px;

                  ${breakpoints.sm} {
                      font-size: 48px;
                      line-height: 53px;
                      margin-bottom: 24px;
                  }

                  ${breakpoints.md} {
                      font-size: 61px;
                      line-height: 67px;
                      margin-bottom: 32px;
                  }

                  ${breakpoints.lg} {
                      font-size: 90px;
                      line-height: 99px;
                      margin-bottom: 40px;
                  }
              `
            : variant == "h550"
            ? css`
                  font-size: 29px;
                  line-height: 32px;
                  font-weight: 700;
                  margin-bottom: 18px;

                  ${breakpoints.sm} {
                      font-size: 39px;
                      line-height: 43px;
                      margin-bottom: 20px;
                  }

                  ${breakpoints.md} {
                      font-size: 48px;
                      line-height: 53px;
                      margin-bottom: 24px;
                  }

                  ${breakpoints.lg} {
                      font-size: 67px;
                      line-height: 74px;
                      margin-bottom: 30px;
                  }
              `
            : variant == "h500"
            ? css`
                  font-size: 26px;
                  line-height: 29px;
                  font-weight: 700;
                  margin-bottom: 18px;

                  ${breakpoints.sm} {
                      font-size: 33px;
                      line-height: 36px;
                      margin-bottom: 20px;
                  }

                  ${breakpoints.md} {
                      font-size: 39px;
                      line-height: 43px;
                      margin-bottom: 24px;
                  }

                  ${breakpoints.lg} {
                      font-size: 50px;
                      line-height: 55px;
                      margin-bottom: 30px;
                  }
              `
            : variant == "h450"
            ? css`
                  font-size: 23px;
                  line-height: 26px;
                  font-weight: 700;
                  margin-bottom: 16px;

                  ${breakpoints.sm} {
                      font-size: 28px;
                      line-height: 31px;
                      margin-bottom: 18px;
                  }

                  ${breakpoints.md} {
                      font-size: 31px;
                      line-height: 34px;
                      margin-bottom: 20px;
                  }

                  ${breakpoints.lg} {
                      font-size: 38px;
                      line-height: 42px;
                      margin-bottom: 22px;
                  }
              `
            : variant == "h400"
            ? css`
                  font-size: 20px;
                  line-height: 22px;
                  font-weight: 700;
                  margin-bottom: 16px;

                  ${breakpoints.sm} {
                      font-size: 23px;
                      line-height: 25px;
                      margin-bottom: 16px;
                  }

                  ${breakpoints.md} {
                      font-size: 25px;
                      line-height: 28px;
                      margin-bottom: 18px;
                  }

                  ${breakpoints.lg} {
                      font-size: 28px;
                      line-height: 31px;
                      margin-bottom: 18px;
                  }
              `
            : variant == "h350"
            ? css`
                  font-size: 18px;
                  line-height: 20px;
                  font-weight: 700;
                  margin-bottom: 16px;

                  ${breakpoints.sm} {
                      font-size: 20px;
                      line-height: 22px;
                      margin-bottom: 16px;
                  }

                  ${breakpoints.md} {
                      font-size: 21px;
                      line-height: 23px;
                      margin-bottom: 18px;
                  }

                  ${breakpoints.lg} {
                      font-size: 22px;
                      line-height: 24px;
                      margin-bottom: 18px;
                  }
              `
            : variant == "p300"
            ? css`
                  font-size: 16px;
                  line-height: 22px;
                  font-weight: 400;
                  margin-bottom: 16px;

                  ${breakpoints.md} {
                      font-size: 17px;
                      line-height: 24px;
                      margin-bottom: 17px;
                  }

                  ${breakpoints.lg} {
                      font-size: 18px;
                      line-height: 26px;
                      margin-bottom: 18px;
                  }
              `
            : css`
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: 400;
                  margin-bottom: 14px;

                  ${breakpoints.md} {
                      font-size: 15px;
                      line-height: 22px;
                      margin-bottom: 15px;
                  }
              `};

    ${({ bottomSpacing }) =>
        !bottomSpacing &&
        css`
            margin-bottom: 0;

            ${breakpoints.xs} {
                margin-bottom: 0;
            }
        `};
`;

export type TypographyProps = ComponentProps<typeof Typography>;
