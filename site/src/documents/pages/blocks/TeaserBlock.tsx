import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { TeaserBlockData } from "@src/blocks.generated";
import { breakpoints, spacing } from "@src/constants.yak";
import { PageLayout } from "@src/layout/PageLayout";
import { styled } from "next-yak";

import { TeaserItemBlock } from "./TeaserItemBlock";

export const TeaserBlock = withPreview(
    ({ data }: PropsWithData<TeaserBlockData>) => (
        <PageLayout grid>
            <PageLayoutContent>
                <ItemWrapper>
                    <ListBlock data={data} block={(block) => <TeaserItemBlock data={block} />} />
                </ItemWrapper>
            </PageLayoutContent>
        </PageLayout>
    ),
    { label: "Teaser" },
);

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
`;

const ItemWrapper = styled.div`
    display: grid;
    gap: ${spacing.D100};

    ${breakpoints.sm} {
        grid-template-columns: repeat(4, 1fr);
    }
`;
