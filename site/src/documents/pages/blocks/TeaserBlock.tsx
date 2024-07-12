import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { TeaserBlockData } from "@src/blocks.generated";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { PageLayout } from "@src/layout/PageLayout";
import styled, { css } from "styled-components";

import { TeaserItemBlock } from "./TeaserItemBlock";

export const TeaserBlock = withPreview(
    ({ data: { heading, items } }: PropsWithData<TeaserBlockData>) => (
        <PageLayout grid>
            <PageLayoutContent>
                <HeadingBlock data={heading} />
                <ItemWrapper $listItemCount={items.blocks.length}>
                    <ListBlock data={items} block={(block) => <TeaserItemBlock data={block} />} />
                </ItemWrapper>
            </PageLayoutContent>
        </PageLayout>
    ),
    { label: "Teaser" },
);

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
    margin: ${({ theme }) => theme.spacing.D300} 0;
`;

const ItemWrapper = styled.div<{ $listItemCount: number }>`
    margin-top: ${({ theme }) => theme.spacing.D200};
    display: grid;
    gap: ${({ theme }) => theme.spacing.D100};
    ${({ $listItemCount, theme }) =>
        $listItemCount > 0 &&
        css`
            grid-template-columns: repeat(${Math.min($listItemCount, 1)}, 1fr);

            ${theme.breakpoints.sm.mediaQuery} {
                grid-template-columns: repeat(${Math.min($listItemCount, 4)}, 1fr);
            }
        `}
`;
