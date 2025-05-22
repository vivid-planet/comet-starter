import { loadMessages } from "@src/util/loadMessages";
import { PropsWithChildren } from "react";
import { RootLayoutClient } from "./RootLayoutClient";

interface RootLayoutProps {
    scope: {
        domain: string;
        language: string;    
    };
}
export async function RootLayout({ children, scope }: PropsWithChildren<RootLayoutProps>) {
    const messages = await loadMessages(scope.language);
    return (
        <html lang={scope.language}>
            <head>
                <meta charSet="utf-8" />
            </head>
            <body>
                <RootLayoutClient language={scope.language} messages={messages}>
                    {children}
                </RootLayoutClient>
            </body>
        </html>
    );
}
