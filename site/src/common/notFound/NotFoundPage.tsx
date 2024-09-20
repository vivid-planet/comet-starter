"use client";

import { Typography } from "@src/common/components/Typography";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormattedMessage } from "react-intl";

interface NotFoundPageProps {
    language?: string;
}

export function NotFoundPage({ language: passedLanguage }: NotFoundPageProps) {
    const { language: languageParam } = useParams();

    const language = passedLanguage ?? languageParam;

    return (
        <div>
            <Typography variant="h400" component="h2">
                <FormattedMessage id="notFound.eyebrow" defaultMessage="Error 404" />
            </Typography>
            <Typography variant="h600" component="h1">
                <FormattedMessage id="notFound.headline" defaultMessage="The requested page does not exist" />
            </Typography>
            <Typography variant="p200">
                <FormattedMessage
                    id="notFound.text"
                    defaultMessage="We apologize, but the page you are looking for cannot be found. Please try navigating to a different page or go back to the homepage. Thank you."
                />
            </Typography>
            <Typography variant="p200">
                <Link href={`/${language}`}>
                    <FormattedMessage id="notFound.link" defaultMessage="Back to Home" />
                </Link>
            </Typography>
        </div>
    );
}
