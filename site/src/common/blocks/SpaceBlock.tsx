import { PropsWithData, withPreview } from "@comet/cms-site";
import { SpaceBlockData } from "@src/blocks.generated";
import { Spacing } from "@src/util/spacing";
import styled from "styled-components";

export const SpaceBlock = withPreview(
    ({ data: { spacing } }: PropsWithData<SpaceBlockData>) => {
        return <Root spacing={Spacing[spacing]} />;
    },
    { label: "Space" },
);

const Root = styled.div<{ spacing: Spacing }>`
    height: ${({ spacing }) => spacing};
`;
