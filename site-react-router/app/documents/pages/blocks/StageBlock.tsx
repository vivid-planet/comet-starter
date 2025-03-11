"use client";
import { ListBlock, type PropsWithData } from "@comet/cms-site";
import { type StageBlockData } from "@app/blocks.generated";

import { BasicStageBlock } from "./BasicStageBlock";

export const StageBlock = ({ data }: PropsWithData<StageBlockData>) => {
    return <ListBlock data={data} block={(block) => <BasicStageBlock data={block} />} />;
};
