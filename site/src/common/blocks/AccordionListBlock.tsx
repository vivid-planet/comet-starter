import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { AccordionListBlockData } from "@src/blocks.generated";
import { AccordionItemBlock } from "@src/common/blocks/AccordionItemBlock";
import styled from "styled-components";

export const AccordionListBlock = withPreview(
    ({ data }: PropsWithData<AccordionListBlockData>) => (
        <Root>
            <ListBlock data={data} block={(block) => <AccordionItemBlock data={block} />} />
        </Root>
    ),
    { label: "Accordion List" },
);

const Root = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey["300"]};
`;
