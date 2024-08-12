import { createOneOfBlock } from "@comet/blocks-admin";

import { BasicStageBlock } from "./BasicStageBlock";

export const StageBlock = createOneOfBlock({
    name: "Stage",
    supportedBlocks: {
        basicStage: BasicStageBlock,
    },
});
