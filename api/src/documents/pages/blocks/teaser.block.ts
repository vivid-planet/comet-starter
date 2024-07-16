import { createListBlock } from "@comet/blocks-api";
import { TeaserItemBlock } from "@src/documents/pages/blocks/teaser-item.block";

export const TeaserBlock = createListBlock({ block: TeaserItemBlock }, "Teaser");
