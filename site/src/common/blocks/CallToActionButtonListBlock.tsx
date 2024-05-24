"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionButtonListBlockData } from "@src/blocks.generated";
import { CallToActionButtonBlock } from "@src/common/blocks/CallToActionButtonBlock";
import styled from "styled-components";

export const CallToActionButtonListBlock = withPreview(
    ({ data: { blocks } }: PropsWithData<CallToActionButtonListBlockData>) => (
        <Root>
            {blocks.map((block) => (
                <CallToActionButtonBlock data={block.props} key={block.key} />
            ))}
        </Root>
    ),
    { label: "Button list" },
);

const Root = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.S300};

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        gap: ${({ theme }) => theme.spacing.S400};
    }
`;
