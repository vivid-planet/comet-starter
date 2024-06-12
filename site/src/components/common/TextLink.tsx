import { HTMLAttributes, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

interface TextLinkProps extends PropsWithChildren<HTMLAttributes<HTMLAnchorElement>> {
    disabled?: boolean;
}

export const TextLink = ({ disabled = false, children, ...props }: TextLinkProps) => (
    <StyledAnchor $disabled={disabled} {...props}>
        {children}
    </StyledAnchor>
);

const StyledAnchor = styled.a<{ $disabled: boolean }>`
    text-decoration: none;

    ${({ $disabled }) =>
        $disabled
            ? css`
                  pointer-events: none;
                  color: ${({ theme }) => theme.palette.grey["300"]};
              `
            : css`
                  color: ${({ theme }) => theme.palette.primary.main};

                  &:hover {
                      color: ${({ theme }) => theme.palette.primary.dark};
                      text-decoration: underline;
                  }
              `}
`;
