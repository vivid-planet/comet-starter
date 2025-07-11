"use client";

import { BlockPreviewProvider, IFrameBridgeProvider, useBlockPreviewFetch, useIFrameBridge } from "@comet/site-nextjs";
import { type FooterContentBlockData } from "@src/blocks.generated";
import { FooterContentBlock } from "@src/layout/footer/blocks/FooterContentBlock";
import { recursivelyLoadBlockData } from "@src/util/recursivelyLoadBlockData";
import { type FunctionComponent, useEffect, useState } from "react";

const PreviewPage: FunctionComponent = () => {
    const iFrameBridge = useIFrameBridge();

    const { fetch, graphQLFetch } = useBlockPreviewFetch();

    const [blockData, setBlockData] = useState<FooterContentBlockData>();
    useEffect(() => {
        async function load() {
            if (!graphQLFetch) return;
            if (!iFrameBridge.block) {
                setBlockData(undefined);
                return;
            }
            const newData = await recursivelyLoadBlockData({
                blockType: "FooterContent",
                blockData: iFrameBridge.block,
                graphQLFetch,
                fetch,
            });
            setBlockData(newData);
        }
        load();
    }, [iFrameBridge.block, fetch, graphQLFetch]);

    return <div>{blockData && <FooterContentBlock data={blockData} />}</div>;
};
const IFrameBridgePreviewPage = () => {
    return (
        <IFrameBridgeProvider>
            <BlockPreviewProvider>
                <PreviewPage />
            </BlockPreviewProvider>
        </IFrameBridgeProvider>
    );
};

export default IFrameBridgePreviewPage;
