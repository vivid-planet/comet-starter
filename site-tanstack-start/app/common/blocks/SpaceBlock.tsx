"use client";
import { type PropsWithData, withPreview } from "@comet/cms-site";
import { type SpaceBlockData } from "@app/blocks.generated";
import { styled } from "styled-components";


export const SpaceBlock = withPreview(
    ({ data: { spacing } }: PropsWithData<SpaceBlockData>) => {
        return <Root $spacing={spacing} />;
    },
    { label: "Space" },
);

const Root = styled.div<{ $spacing: SpaceBlockData["spacing"] }>`
    height: ${({ theme, $spacing }) => theme.spacing[$spacing]};
`;
