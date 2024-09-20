import { IntlProvider } from "@src/common/intl/IntlProvider";
import { loadMessages } from "@src/common/intl/loadMessages";
import { NotFoundPage } from "@src/common/notFound/NotFoundPage";

export default async function NotFound() {
    const language = "en";
    const messages = await loadMessages(language);

    return (
        <IntlProvider locale={language} messages={messages}>
            <NotFoundPage language={language} />
        </IntlProvider>
    );
}
