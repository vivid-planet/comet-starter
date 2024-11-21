import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import "./globals.css";

import { styled } from "@src/../styled-system/jsx";
import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import { ReactNode } from "react";

const Root = styled.div`
    width: 500px;
    height: 500px;
    background-color: aqua;
`;

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head />
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    {children}
                    <Root>Hello World!</Root>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
