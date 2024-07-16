"use client";
import { OneOfBlock, PropsWithData, SupportedBlocks } from "@comet/cms-site";
import { StageBlockData } from "@src/blocks.generated";

import { BasicStageBlock } from "./BasicStageBlock";

const supportedBlocks: SupportedBlocks = {
    basicStage: (props) => <BasicStageBlock data={props} />,
};

export const StageBlock = ({ data }: PropsWithData<StageBlockData>) => {
    return <OneOfBlock data={data} supportedBlocks={supportedBlocks} />;
};
