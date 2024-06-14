import { PropsWithData, withPreview } from "@comet/cms-site";
import { ColumnsBlockData } from "@src/blocks.generated";
import { ColumnsContentBlock } from "@src/common/blocks/ColumnsContentBlock";
import { PageLayout } from "@src/components/common/PageLayout";
import styled, { css } from "styled-components";

const column1Grid = {
    "2-20-2": "3 / 23",
    "4-16-4": "5 / 21",
    "6-12-6": "7 / 19",
    "9-9": "3 / 12",
    "12-6": "3 / 15",
    "6-12": "3 / 9",
};

const column2Grid = {
    "9-9": "14 / 23",
    "12-6": "17 / 23",
    "6-12": "11 / 23",
};

export const ColumnsBlock = withPreview(
    ({ data: { columns, layout } }: PropsWithData<ColumnsBlockData>) => {
        return (
            <PageLayout grid>
                {columns.map((column, index) => {
                    const gridColumn = index === 0 ? column1Grid[layout] : column2Grid[layout];
                    return (
                        <Column $column={gridColumn} key={index}>
                            <ColumnsContentBlock data={column.props} />
                        </Column>
                    );
                })}
            </PageLayout>
        );
    },
    { label: "Columns" },
);

const Column = styled.div<{ $column: string }>`
    grid-column: 3 / -3;

    ${({ theme, $column }) =>
        $column &&
        css`
            ${theme.breakpoints.xs.mediaQuery} {
                grid-column: ${$column};
            }
        `};
`;
