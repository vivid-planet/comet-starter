import { PropsWithData, withPreview } from "@comet/cms-site";
import { SpaceBlockData } from "@src/blocks.generated";
import { spacing } from "@src/util/spacing";
import styled from "styled-components";

export const SpaceBlock = withPreview(
    ({ data: { spacing: spacingValue } }: PropsWithData<SpaceBlockData>) => {
        return <Root $spacing={spacing[spacingValue]} />;
    },
    { label: "Space" },
);

const Root = styled.div<{ $spacing: string }>`
    height: ${({ $spacing }) => $spacing};
`;
