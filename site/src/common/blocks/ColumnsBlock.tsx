import { PropsWithData, withPreview } from "@comet/cms-site";
import { ColumnsBlockData } from "@src/blocks.generated";
import { ColumnsContentBlock } from "@src/common/blocks/ColumnsContentBlock";
import { PageLayout } from "@src/layout/PageLayout";
import styled, { css } from "styled-components";

export const ColumnsBlock = withPreview(
    ({ data: { columns, layout } }: PropsWithData<ColumnsBlockData>) => (
        <PageLayout grid>
            {columns.map((column) => (
                <Column $layout={layout} key={column.key}>
                    <ColumnsContentBlock data={column.props} />
                </Column>
            ))}
        </PageLayout>
    ),
    { label: "Columns" },
);

const Column = styled.div<{ $layout: string }>`
    grid-column: 3 / -3;

    ${({ theme }) => theme.breakpoints.xs.mediaQuery} {
        ${({ $layout }) =>
            $layout === "4-16-4" &&
            css`
                grid-column: 5 / -5;
            }
        `};
        ${({ $layout }) =>
            $layout === "6-12-6" &&
            css`
                grid-column: 7 / -7;
            }
        `};
        ${({ $layout }) =>
            $layout === "9-9" &&
            css`
                grid-column: 3 / 12;

                &:nth-child(even) {
                    grid-column: 14 / 23;
                }
            }
        `};
        ${({ $layout }) =>
            $layout === "12-6" &&
            css`
                grid-column: 3 / 15;

                &:nth-child(even) {
                    grid-column: 17 / 23;
                }
            }
        `};
        ${({ $layout }) =>
            $layout === "6-12" &&
            css`
                grid-column: 3 / 9;

                &:nth-child(even) {
                    grid-column: 11 / 23;
                }
            }
        `};
    }
`;
