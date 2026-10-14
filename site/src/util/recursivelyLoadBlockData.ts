import { type BlockLoader, type BlockLoaderDependencies, recursivelyLoadBlockData as dextinityRecursivelyLoadBlockData } from "@dextinity/site-react";
import { loader as pageTreeIndexLoader } from "@src/common/blocks/PageTreeIndexBlock.loader";
import type { ContentScope } from "@src/site-configs";

declare module "@dextinity/site-react" {
    export interface BlockLoaderDependencies {
        scope: ContentScope;
    }
}

const blockLoaders: Record<string, BlockLoader> = {
    PageTreeIndex: pageTreeIndexLoader,
};

//small wrapper for @dextinity/site-react recursivelyLoadBlockData that injects blockMeta from block-meta.json
export async function recursivelyLoadBlockData(options: { blockType: string; blockData: unknown } & BlockLoaderDependencies) {
    const blocksMeta = await import("../../block-meta.json"); //dynamic import to avoid this json in client bundle
    return dextinityRecursivelyLoadBlockData({ ...options, blocksMeta: blocksMeta.default, loaders: blockLoaders });
}
