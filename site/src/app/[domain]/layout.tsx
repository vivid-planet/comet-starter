import { SitePreviewProvider } from "@comet/cms-site";
import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import type { Metadata } from "next";
import { draftMode } from "next/headers";

export const metadata: Metadata = {
    title: "Comet Starter",
};

export default async function RootLayout({
    children,
    params: { domain },
}: Readonly<{
    children: React.ReactNode;
    params: { domain: string };
}>) {
    const siteConfig = await getSiteConfigForDomain(domain);
    const isDraftModeEnabled = draftMode().isEnabled;

    return (
        <html>
            <head />
            <body>
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
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    <SiteConfigProvider siteConfig={siteConfig}>
                        {isDraftModeEnabled ? <SitePreviewProvider>{children}</SitePreviewProvider> : children}
                    </SiteConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
