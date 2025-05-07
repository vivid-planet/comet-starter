"use client";

import { PropsWithChildren } from "react";
import { IntlProvider } from "@src/util/IntlProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "@src/theme";

export function RootLayoutClient({ children, language, messages }: PropsWithChildren<{ language: string; messages: Record<string, string> }>) {
    return (
        <IntlProvider locale={language} messages={messages}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </IntlProvider>
    );
}
