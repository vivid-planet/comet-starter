import { BlockPreviewProvider, IFrameBridgeProvider, useBlockPreviewFetch, useIFrameBridge } from '@comet/cms-site';
import { PageContentBlock } from '@src/documents/pages/blocks/PageContentBlock';
import { theme } from '@src/theme';
import { IntlProvider } from '@src/util/IntlProvider';
import { loadMessages } from '@src/util/loadMessages';
import { recursivelyLoadBlockData } from '@src/util/recursivelyLoadBlockData';
import { getSiteConfigForDomain } from '@src/util/siteConfig';
import { SiteConfigProvider } from '@src/util/SiteConfigProvider';
import { ComponentType, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { type Request, type Response as ExpressResponse } from 'express';
import { serverOnly$ } from 'vite-env-only/macros';

export const loader = serverOnly$(async (request: Request, response: ExpressResponse) => {
    const siteConfig = getSiteConfigForDomain(request.params.domain);
    const messages = await loadMessages!(request.params.language);
    return { siteConfig, messages, params: request.params };
});

const types: Record<string, { component: ComponentType<any>; blockType: string; }> = {
    page: {
        component: PageContentBlock,
        blockType: "PageContent",
        
    }
};

function PreviewPage({ loaderData }: { loaderData: any }) { 
    const blockType = types[loaderData.params.type];
    const iFrameBridge = useIFrameBridge();

    const { fetch, graphQLFetch } = useBlockPreviewFetch();

    const [blockData, setBlockData] = useState<any>();
    useEffect(() => {
        async function load() {
            if (!graphQLFetch) return;
            if (!iFrameBridge.block) {
                setBlockData(undefined);
                return;
            }
            const newData = await recursivelyLoadBlockData({
                blockType: blockType.blockType,
                blockData: iFrameBridge.block,
                graphQLFetch,
                fetch,
            });
            setBlockData(newData);
        }
        load();
    }, [iFrameBridge.block, fetch, graphQLFetch]);

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale={loaderData.params.language} messages={loaderData.messages}>
                <SiteConfigProvider siteConfig={loaderData.siteConfig}>
                    <div>{blockData && <blockType.component data={blockData} />}</div>
                </SiteConfigProvider>
            </IntlProvider>
        </ThemeProvider>
    );
}

export function BlockPreview(props: { loaderData: Awaited<ReturnType<NonNullable<typeof loader>>> }) {
    return (
        <IFrameBridgeProvider>
            <BlockPreviewProvider>
                <PreviewPage {...props} />
            </BlockPreviewProvider>
        </IFrameBridgeProvider>
    );
};
