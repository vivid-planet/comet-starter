import "@fontsource/roboto";
import "@fontsource/roboto/700.css";

import { GlobalStyle } from "@src/layout/GlobalStyle";
import { extractNextPublicEnvs } from "@src/util/nextPublic";
import { NextPublicProvider } from "@src/util/NextPublicProvider";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <head />
            <body>
                <NextPublicProvider envs={extractNextPublicEnvs(process.env)}>
                    <StyledComponentsRegistry>
                        <GlobalStyle />
                        <ResponsiveSpacingStyle />
                        {children}
                    </StyledComponentsRegistry>
                </NextPublicProvider>
            </body>
        </html>
    );
}
