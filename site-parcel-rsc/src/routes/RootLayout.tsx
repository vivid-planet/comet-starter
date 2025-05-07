import { loadMessages } from "@src/util/loadMessages";
import { PropsWithChildren } from "react";
import { RootLayoutClient } from "./RootLayoutClient";

export async function RootLayout({ children, domain, language }: PropsWithChildren<{ domain: string; language: string }>) {
    const messages = await loadMessages(language);
    return (
        <html lang={language}>
            <head>
                <meta charSet="utf-8" />
            </head>
            <body>
                <RootLayoutClient language={language} messages={messages}>
                    {children}
                </RootLayoutClient>
            </body>
        </html>
    );
}
