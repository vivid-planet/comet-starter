"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { SpaceBlockData } from "@src/blocks.generated";
import { spacing } from "@src/constants.yak";
import { styled } from "next-yak";

export const SpaceBlock = withPreview(
    ({ data: { spacing } }: PropsWithData<SpaceBlockData>) => {
        return <Root $spacing={spacing} />;
    },
    { label: "Space" },
);

// TODO: revert
const Root = styled.div<{ $spacing: SpaceBlockData["spacing"] }>`
    height: ${({ $spacing }) => spacing.D100};
`;
