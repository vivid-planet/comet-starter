"use client";
import { BlockPreviewProvider, IFrameBridgeProvider, useBlockPreviewFetch, useIFrameBridge } from "@comet/cms-site";
import { PageContentBlockData } from "@src/blocks.generated";
import { PageContentBlock } from "@src/documents/pages/blocks/PageContentBlock";
import { StageBlock } from "@src/documents/pages/blocks/StageBlock";
import { graphQLApiUrl } from "@src/util/graphQLClient";
import { recursivelyLoadBlockData } from "@src/util/recursivelyLoadBlockData";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import { useEffect, useState } from "react";

import { useBlockPreviewSiteConfig } from "../SiteConfigsProvider";

const PagePreview: React.FunctionComponent = () => {
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

const StagePreview = () => {
    const { block: stage } = useIFrameBridge();
    return stage ? <StageBlock data={stage} /> : null;
};

const previewComponents = {
    page: PagePreview,
    stage: StagePreview,
};

const PreviewWrapper = ({ type }: { type: string }) => {
    const siteConfig = useBlockPreviewSiteConfig((siteConfigs, contentScope) =>
        siteConfigs.find((siteConfig) => siteConfig.scope.domain === contentScope.domain),
    );
    const PreviewComponent = previewComponents[type];
    return (
        <SiteConfigProvider siteConfig={siteConfig}>
            <PreviewComponent />
        </SiteConfigProvider>
    );
};

const PreviewPage = ({ params }: { params: { type: string } }) => {
    return (
        <IFrameBridgeProvider>
            <BlockPreviewProvider>
                <PreviewWrapper type={params.type} />
            </BlockPreviewProvider>
        </IFrameBridgeProvider>
    );
};

export default PreviewPage;
