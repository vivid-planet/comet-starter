"use client";
import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionListBlockData } from "@src/blocks.generated";
import { CallToActionBlock } from "@src/common/blocks/CallToActionBlock";
import { PageGridLayout, StandardPageGridColumn } from "@src/components/common/PageLayout";
import styled from "styled-components";

type CallToActionListBlockProps = PropsWithData<CallToActionListBlockData>;

export const CallToActionListBlock = withPreview(
    ({ data }: CallToActionListBlockProps) => (
        <Root>
            <ListBlock data={data} block={(block) => <CallToActionBlock data={block} />} />
        </Root>
    ),
    { label: "Call To Action List" },
);

export const PageContentCallToActionListBlock = (props: CallToActionListBlockProps) => (
    <PageGridLayout>
        <StandardPageGridColumn>
            <CallToActionListBlock {...props} />
        </StandardPageGridColumn>
    </PageGridLayout>
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
