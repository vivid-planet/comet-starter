import { SitePreviewProvider } from "@comet/cms-site";
import { GlobalStyle } from "@src/layout/GlobalStyle";
import { getSiteConfig } from "@src/middleware";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { PublicEnvScript } from "next-runtime-env";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Comet Starter",
};

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
    const { gtmId } = await getSiteConfig();

    return (
        <html>
            <head>
                <PublicEnvScript />
            </head>
            <body>
                {gtmId && (
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                            height="0"
                            width="0"
                            style={{ display: "none", visibility: "hidden" }}
                        />
                    </noscript>
                )}
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    {draftMode().isEnabled ? <SitePreviewProvider>{children}</SitePreviewProvider> : children}
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
