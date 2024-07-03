import { PageContentBlockData } from "@src/../blocks.generated";
import { BlocksBlock } from "@src/components/BlocksBlock";
import { SpaceBlock } from "@src/components/SpaceBlock";
import React from "react";

export interface PropsWithData<Data = unknown> {
    data: Data;
}

export interface SupportedBlocks {
    [key: string]: (props: any) => React.ReactNode | undefined;
}

const supportedBlocks: SupportedBlocks = {
    space: (props) => <SpaceBlock data={props} />,
};

export const PageContentBlock = ({ data }: PropsWithData<PageContentBlockData>) => {
    return <BlocksBlock data={data} supportedBlocks={supportedBlocks} />;
};
