import { type BlockLoader, type BlockLoaderDependencies, recursivelyLoadBlockData as cometRecursivelyLoadBlockData } from "@comet/site-nextjs";
import { loader as pageTreeIndexLoader } from "@src/common/blocks/PageTreeIndexBlock.loader";
import { type ContentScope } from "@src/site-configs";

declare module "@comet/site-nextjs" {
    export interface BlockLoaderDependencies {
        pageTreeNodeId?: string;
        scope: ContentScope;
    }
}

const blockLoaders: Record<string, BlockLoader> = {
    PageTreeIndex: pageTreeIndexLoader,
};

//small wrapper for @comet/site-nextjs recursivelyLoadBlockData that injects blockMeta from block-meta.json
export async function recursivelyLoadBlockData(options: { blockType: string; blockData: unknown } & BlockLoaderDependencies) {
    const blocksMeta = await import("../../block-meta.json"); //dynamic import to avoid this json in client bundle
    return cometRecursivelyLoadBlockData({ ...options, blocksMeta: blocksMeta.default, loaders: blockLoaders });
}
