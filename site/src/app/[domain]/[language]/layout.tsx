import { IntlProvider } from "@src/common/intl/IntlProvider";
import { loadMessages } from "@src/common/intl/loadMessages";
import ServerSideHeader from "@src/layout/header/ServerSideHeader";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Page({ children, params: { language, domain } }: PropsWithChildren<{ params: { language: string; domain: string } }>) {
    const siteConfig = getSiteConfigForDomain(domain);

    if (!siteConfig.scope.languages.includes(language)) {
        notFound();
    }

    const messages = await loadMessages(language);

    return (
        <IntlProvider locale={language} messages={messages}>
            <ServerSideHeader domain={domain} language={language} />
            {children}
        </IntlProvider>
    );
}
