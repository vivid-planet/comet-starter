import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Comet Starter",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
