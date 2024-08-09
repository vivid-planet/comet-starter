import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { AccordionBlockData } from "@src/blocks.generated";
import { AccordionItemBlock } from "@src/common/blocks/AccordionItemBlock";
import { PageLayout } from "@src/layout/PageLayout";
import styled from "styled-components";

type AccordionBlockProps = PropsWithData<AccordionBlockData>;

export const AccordionBlock = withPreview(
    ({ data }: AccordionBlockProps) => (
        <Root>
            <ListBlock data={data} block={(block) => <AccordionItemBlock data={block} />} />
        </Root>
    ),
    { label: "Accordion" },
);

export const PageContentAccordionBlock = (props: AccordionBlockProps) => (
    <PageLayout grid>
        <PageLayoutContent>
            <AccordionBlock {...props} />
        </PageLayoutContent>
    </PageLayout>
);

const Root = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["300"]};
`;

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
`;
