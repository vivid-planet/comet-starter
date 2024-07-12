import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { KeyFactsBlockData } from "@src/blocks.generated";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { PageLayout } from "@src/layout/PageLayout";
import styled, { css } from "styled-components";

import { KeyFactItemBlock } from "./KeyFactItemBlock";

export const KeyFactsBlock = withPreview(
    ({ data: { heading, items } }: PropsWithData<KeyFactsBlockData>) => (
        <PageLayout grid>
            <PageLayoutContent>
                <HeadingBlock data={heading} />
                <ItemWrapper $listItemCount={items.blocks.length}>
                    <ListBlock data={items} block={(block) => <KeyFactItemBlock data={block} />} />
                </ItemWrapper>
            </PageLayoutContent>
        </PageLayout>
    ),
    { label: "Key facts" },
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
            grid-template-columns: repeat(${Math.min($listItemCount, 2)}, 1fr);

            ${theme.breakpoints.sm.mediaQuery} {
                grid-template-columns: repeat(${Math.min($listItemCount, 4)}, 1fr);
            }
        `}
`;
