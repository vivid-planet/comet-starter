import { createListBlock } from "@comet/blocks-api";

import { StageBlock } from "./stage.block";

export const StageListBlock = createListBlock({ block: StageBlock }, "StageList");
