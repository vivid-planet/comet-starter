import { SpaceBlockData } from "@src/../blocks.generated";
import { PropsWithData } from "@src/components/PageContentBlock";
import React from "react";
import styled from "styled-components";

export const SpaceBlock = ({ data: { spacing } }: PropsWithData<SpaceBlockData>) => {
    return <Root>space {spacing}</Root>;
};

const Root = styled.div`
    height: 400px;
    width: 400px;
    background-color: red;
`;
