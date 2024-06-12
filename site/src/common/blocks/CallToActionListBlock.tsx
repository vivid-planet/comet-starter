"use client";
import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionListBlockData } from "@src/blocks.generated";
import { CallToActionBlock } from "@src/common/blocks/CallToActionBlock";
import { GridRoot } from "@src/components/common/GridRoot";
import styled, { css } from "styled-components";

interface CallToActionListBlockProps extends PropsWithData<CallToActionListBlockData> {
    shouldApplyPageGridLayout?: boolean;
}

export const CallToActionListBlock = withPreview(
    ({ data, shouldApplyPageGridLayout }: CallToActionListBlockProps) => {
        const content = (
            <Root $shouldApplyPageGridLayout={shouldApplyPageGridLayout}>
                <ListBlock data={data} block={(block) => <CallToActionBlock data={block} />} />
            </Root>
        );

        // TODO: move GridRoot to PageContentBlock in comet v7
        if (shouldApplyPageGridLayout) {
            return <GridRoot>{content}</GridRoot>;
        }

        return content;
    },
    { label: "Call To Action List" },
);

const Root = styled.div<{ $shouldApplyPageGridLayout?: boolean }>`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.S300};

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        gap: ${({ theme }) => theme.spacing.S400};
    }

    ${({ $shouldApplyPageGridLayout }) =>
        $shouldApplyPageGridLayout &&
        css`
            grid-column: 3 / 23;
        `}
`;
