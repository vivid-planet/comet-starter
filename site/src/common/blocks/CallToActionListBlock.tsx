"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionListBlockData } from "@src/blocks.generated";
import { CallToActionBlock } from "@src/common/blocks/CallToActionBlock";
import styled from "styled-components";

export const CallToActionListBlock = withPreview(
    ({ data: { blocks } }: PropsWithData<CallToActionListBlockData>) => (
        <Root>
            {blocks.map((block) => (
                <CallToActionBlock data={block.props} key={block.key} />
            ))}
        </Root>
    ),
    { label: "Call To Action List" },
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
