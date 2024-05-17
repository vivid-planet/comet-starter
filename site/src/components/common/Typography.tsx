import { TypographyStyle } from "@src/components/common/TypographyStyle";
import * as React from "react";
import styled from "styled-components";

export type TypographyVariant = "h600" | "h550" | "h500" | "h450" | "h350" | "h400" | "h300" | "p200" | "p100" | "buttonText";

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
    font-family: ${TypographyStyle.fontFamily};
    ${({ variant = "p200" }) => TypographyStyle.variants[variant]};
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
