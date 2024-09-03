"use client";

import { useIFrameBridge } from "@comet/cms-site";
import type { ContentScope, PublicSiteConfig } from "@src/site-configs";
import { createContext, PropsWithChildren, useContext } from "react";

const SiteConfigsContext = createContext<PublicSiteConfig[]>([]);

export function useBlockPreviewSiteConfig(
    getSiteConfigFromContentScope: (siteConfigs: PublicSiteConfig[], contentScope: ContentScope) => PublicSiteConfig | undefined,
) {
    const iFrameBridge = useIFrameBridge();
    if (!iFrameBridge.hasBridge) throw new Error("IFrameBridge not initialized.");
    const contentScope = iFrameBridge.contentScope as ContentScope;
    const siteConfigs = useContext(SiteConfigsContext);
    if (!contentScope) return;
    return getSiteConfigFromContentScope(siteConfigs, contentScope);
}

export function SiteConfigsProvider({ children, siteConfigs }: PropsWithChildren<{ siteConfigs: PublicSiteConfig[] }>) {
    return <SiteConfigsContext.Provider value={siteConfigs}>{children}</SiteConfigsContext.Provider>;
}
