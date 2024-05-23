"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { SpaceBlockData } from "@src/blocks.generated";
import styled from "styled-components";

export const SpaceBlock = withPreview(
    ({ data: { spacing: spacingVariant } }: PropsWithData<SpaceBlockData>) => {
        return <Root $spacingVariant={spacingVariant} />;
    },
    { label: "Space" },
);

const Root = styled.div<{ $spacingVariant: SpaceBlockData["spacing"] }>`
    height: ${({ theme, $spacingVariant }) => theme.spacing[$spacingVariant]};
`;
