"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FormattedMessage } from "react-intl";

export function NotFoundContent() {
    const { language } = useParams();

    return (
        <>
            <h1>
                <FormattedMessage id="notFound.headline" defaultMessage="Oops. Something went wrong." />
            </h1>
            <FormattedMessage id="notFound.text" defaultMessage="Sorry, the selected page is currently not available." />
            <Link href={`/${language}`}>
                <FormattedMessage id="notFound.link" defaultMessage="Back to Homepage" />
            </Link>
        </>
    );
}
