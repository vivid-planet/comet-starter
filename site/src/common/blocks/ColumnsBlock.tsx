import { PropsWithData, withPreview } from "@comet/cms-site";
import { ColumnsBlockData } from "@src/blocks.generated";
import { ColumnsContentBlock } from "@src/common/blocks/ColumnsContentBlock";
import { PageLayout } from "@src/layout/PageLayout";
import styled, { css } from "styled-components";

const columnCountForLayout: Record<ColumnsBlockData["layout"], number> = {
    "2-20-2": 1,
    "4-16-4": 1,
    "6-12-6": 1,
    "9-9": 2,
    "12-6": 2,
    "6-12": 2,
};

const columnGrid = {
    0: {
        // column layout for one column
        "2-20-2": "3 / 23",
        "4-16-4": "5 / 21",
        "6-12-6": "7 / 19",

        // column layout for 1. column of two columns layout
        "9-9": "3 / 12",
        "12-6": "3 / 15",
        "6-12": "3 / 9",
    },
    1: {
        // column layout for 2. column of two columns layout
        "9-9": "14 / 23",
        "12-6": "17 / 23",
        "6-12": "11 / 23",
    },
};

export const ColumnsBlock = withPreview(
    ({ data: { columns, layout } }: PropsWithData<ColumnsBlockData>) => (
        <PageLayout grid>
            {columns.map((column, index) => (
                <Column $column={columnGrid[index % columnCountForLayout[layout]][layout]} key={index}>
                    <ColumnsContentBlock data={column.props} />
                </Column>
            ))}
        </PageLayout>
    ),
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
