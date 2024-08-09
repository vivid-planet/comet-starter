"use client";
import { ListBlock, PropsWithData } from "@comet/cms-site";
import { StageListBlockData } from "@src/blocks.generated";
import { StageBlock } from "@src/documents/pages/blocks/StageBlock";

export const StageListBlock = ({ data }: PropsWithData<StageListBlockData>) => {
    return <ListBlock data={data} block={(block) => <StageBlock data={block} />} />;
};
