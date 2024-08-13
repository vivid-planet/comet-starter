"use client";
import { ComponentProps, PropsWithChildren } from "react";
import { IntlProvider as LibraryIntlProvider } from "react-intl";

type Messages = ComponentProps<typeof LibraryIntlProvider>["messages"];

interface IntlProviderProps extends PropsWithChildren {
    locale: string;
    messages: Messages;
}

export function IntlProvider({ children, locale, messages }: IntlProviderProps) {
    return (
        <LibraryIntlProvider locale={locale} defaultLocale={locale} messages={messages}>
            {children}
        </LibraryIntlProvider>
    );
}
