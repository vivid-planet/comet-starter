import { SitePreviewProvider } from "@comet/cms-site";
import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { PublicEnvScript } from "next-runtime-env";

export const metadata: Metadata = {
    title: "Comet Starter",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <head>
                <PublicEnvScript />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    {draftMode().isEnabled ? <SitePreviewProvider>{children}</SitePreviewProvider> : children}
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
