import { hasRichTextBlockContent, ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { TeaserBlockData } from "@src/blocks.generated";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { PageLayout } from "@src/layout/PageLayout";
import styled from "styled-components";

import { TeaserItemBlock } from "./TeaserItemBlock";

export const TeaserBlock = withPreview(
    ({ data: { heading, items } }: PropsWithData<TeaserBlockData>) => (
        <PageLayout grid>
            <PageLayoutContent>
                {(hasRichTextBlockContent(heading.eyebrow) || hasRichTextBlockContent(heading.headline)) && <HeadingBlock data={heading} />}
                <ItemWrapper>
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

const ItemWrapper = styled.div`
    margin-top: ${({ theme }) => theme.spacing.D200};
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.D100};
`;
