"use client";
import { BlockPreviewProvider, IFrameBridgeProvider, useBlockPreviewFetch, useIFrameBridge } from "@comet/cms-site";
import { PageContentBlockData } from "@src/blocks.generated";
import { PageContentBlock } from "@src/documents/pages/blocks/PageContentBlock";
import { StageBlock } from "@src/documents/pages/blocks/StageBlock";
import { graphQLApiUrl } from "@src/util/graphQLClient";
import { recursivelyLoadBlockData } from "@src/util/recursivelyLoadBlockData";
import { useEffect, useState } from "react";

const Page: React.FunctionComponent = () => {
    const iFrameBridge = useIFrameBridge();

    const { fetch, graphQLFetch } = useBlockPreviewFetch(graphQLApiUrl);

    const [blockData, setBlockData] = useState<PageContentBlockData>();
    useEffect(() => {
        async function load() {
            if (!iFrameBridge.block) {
                setBlockData(undefined);
                return;
            }
            const newData = await recursivelyLoadBlockData({
                blockType: "PageContent",
                blockData: iFrameBridge.block,
                graphQLFetch,
                fetch,
            });
            setBlockData(newData);
        }
        load();
    }, [iFrameBridge.block, fetch, graphQLFetch]);

    return <div>{blockData && <PageContentBlock data={blockData} />}</div>;
};

const Stage = () => {
    const { block: stage } = useIFrameBridge();
    return stage ? <StageBlock data={stage} /> : null;
};

const IFrameBridgePreviewPage = ({ params: { type } }: { params: { type: string } }) => {
    return (
        <IFrameBridgeProvider>
            <BlockPreviewProvider>
                {type === "page" && <Page />}
                {type === "stage" && <Stage />}
            </BlockPreviewProvider>
        </IFrameBridgeProvider>
    );
};

export default IFrameBridgePreviewPage;
