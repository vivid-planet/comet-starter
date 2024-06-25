"use client";
import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionListBlockData } from "@src/blocks.generated";
import { CallToActionBlock } from "@src/common/blocks/CallToActionBlock";
import styled from "styled-components";

export const CallToActionListBlock = withPreview(
    ({ data }: PropsWithData<CallToActionListBlockData>) => (
        <Root>
            <ListBlock data={data} block={(block) => <CallToActionBlock data={block} />} />
        </Root>
    ),
    { label: "Call To Action List" },
);

const Root = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: ${({ theme }) => theme.spacing.S300};

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        gap: ${({ theme }) => theme.spacing.S400};
    }
`;
