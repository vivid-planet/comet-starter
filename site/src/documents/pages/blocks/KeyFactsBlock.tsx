import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { KeyFactsBlockData } from "@src/blocks.generated";
import { breakpoints, spacing } from "@src/constants.yak";
import { PageLayout } from "@src/layout/PageLayout";
import { css, styled } from "next-yak";

import { KeyFactItemBlock } from "./KeyFactItemBlock";

export const KeyFactsBlock = withPreview(
    ({ data }: PropsWithData<KeyFactsBlockData>) => (
        <PageLayout grid>
            <PageLayoutContent>
                <ItemWrapper $listItemCount={data.blocks.length}>
                    <ListBlock data={data} block={(block) => <KeyFactItemBlock data={block} />} />
                </ItemWrapper>
            </PageLayoutContent>
        </PageLayout>
    ),
    { label: "Key facts" },
);

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
`;

const ItemWrapper = styled.div<{ $listItemCount: number }>`
    display: grid;
    gap: ${spacing.D100};

    ${({ $listItemCount }) =>
        $listItemCount > 0 &&
        css`
            grid-template-columns: repeat(${Math.min($listItemCount, 2)}, 1fr);

            ${breakpoints.sm} {
                grid-template-columns: repeat(${Math.min($listItemCount, 4)}, 1fr);
            }
        `}
`;
