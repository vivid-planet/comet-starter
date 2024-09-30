import { IntlProvider } from "@src/common/intl/IntlProvider";
import { loadMessages } from "@src/common/intl/loadMessages";
import { NotFoundPage } from "@src/common/notFound/NotFoundPage";
import ServerSideHeader from "@src/layout/header/ServerSideHeader";
import { getSiteConfig } from "@src/util/siteConfig";

export default async function NotFound() {
    const siteConfig = await getSiteConfig();

    const language = siteConfig.scope.languages[0];
    const messages = await loadMessages(language);

    return (
        <IntlProvider locale={language} messages={messages}>
            <ServerSideHeader domain={siteConfig.scope.domain} language={language} />
            <NotFoundPage language={language} />
        </IntlProvider>
    );
}
