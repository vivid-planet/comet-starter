import { SitePreviewProvider } from "@comet/cms-site";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Comet Starter",
};

export default async function SiteLayout({ children, params: { domain } }: Readonly<PropsWithChildren<{ params: { domain: string } }>>) {
    const siteConfig = await getSiteConfigForDomain(domain);
    const isDraftModeEnabled = draftMode().isEnabled;

    return (
        <>
            {siteConfig.gtmId && (
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
            )}

            <SiteConfigProvider siteConfig={siteConfig}>
                {isDraftModeEnabled ? <SitePreviewProvider>{children}</SitePreviewProvider> : children}
            </SiteConfigProvider>
        </>
    );
}
