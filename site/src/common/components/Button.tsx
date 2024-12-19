import { colors, font, spacing } from "@src/constants.yak";
import { css, styled } from "next-yak";

export type ButtonVariant = "contained" | "outlined" | "text";

export const Button = styled.button<{ variant?: ButtonVariant }>`
    display: inline-flex;
    padding: ${spacing.S400} ${spacing.S500};
    border-radius: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out;

    text-align: center;
    text-decoration: none;
    font-family: ${font.fontFamily};
    font-size: 16px;
    font-weight: 700;
    line-height: 110%;

    ${({ variant = "contained" }) =>
        variant === "contained"
            ? css`
                  background-color: ${colors.primary.main};
                  color: ${colors.primary.contrastText};
                  border: 1px solid ${colors.primary.main};

                  &:hover {
                      background-color: ${colors.primary.dark};
                      border-color: ${colors.primary.dark};
                  }

                  &:disabled {
                      pointer-events: none;
                      background-color: ${colors.gray["50"]};
                      color: ${colors.gray["400"]};
                      border-color: ${colors.gray["200"]};
                  }
              `
            : variant === "outlined"
            ? css`
                  background-color: transparent;
                  color: ${colors.primary.main};
                  border: 1px solid ${colors.primary.main};

                  &:hover {
                      color: ${colors.primary.dark};
                      border-color: ${colors.primary.dark};
                  }

                  &:disabled {
                      pointer-events: none;
                      color: ${colors.gray["300"]};
                      border-color: ${colors.gray["200"]};
                  }
              `
            : css`
                  background-color: transparent;
                  color: ${colors.primary.main};
                  border: 1px solid transparent;

                  &:hover {
                      color: ${colors.primary.dark};
                  }

                  &:disabled {
                      pointer-events: none;
                      color: ${colors.gray["300"]};
                  }
              `};
`;
