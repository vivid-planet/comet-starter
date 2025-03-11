"use client";
import { type PropsWithData, withPreview } from "@comet/cms-site";
import { type StandaloneHeadingBlockData } from "@app/blocks.generated";
import { HeadingBlock } from "@app/common/blocks/HeadingBlock";
import { PageLayout } from "@app/layout/PageLayout";
import { type CSSProperties } from "react";
import { styled } from "styled-components";


type StandaloneHeadingBlockProps = PropsWithData<StandaloneHeadingBlockData>;

export const StandaloneHeadingBlock = withPreview(
    ({ data: { heading, textAlignment } }: StandaloneHeadingBlockProps) => {
        return (
            <Root $textAlign={textAlignment}>
                <HeadingBlock data={heading} />
            </Root>
        );
    },
    { label: "Heading" },
);

export const PageContentStandaloneHeadingBlock = (props: StandaloneHeadingBlockProps) => (
    <PageLayout grid>
        <PageLayoutContent>
            <StandaloneHeadingBlock {...props} />
        </PageLayoutContent>
    </PageLayout>
);

const Root = styled.div<{ $textAlign: CSSProperties["textAlign"] }>`
    text-align: ${({ $textAlign }) => $textAlign};
`;

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
`;
