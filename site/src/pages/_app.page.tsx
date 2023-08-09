import { defaultLanguage } from "@src/config";
import { getMessages } from "@src/lang";
import App, { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import Script from "next/script";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        -webkit-text-size-adjust: none;
        font-family: sans-serif;
        font-weight: 400;
    }
`;

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric): void {
    // https://nextjs.org/docs/advanced-features/measuring-performance#sending-results-to-analytics
    if (process.env.NEXT_PUBLIC_GTM_ID) {
        const event = {
            event: "web-vitals",
            event_category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
            event_action: name,
            event_value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
            event_label: id, // id unique to current page load
            non_interaction: true, // avoids affecting bounce rate.
        };
        window.dataLayer.push(event);
    }
}

interface CustomAppProps extends AppProps {
    locale: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any;
}

export default function CustomApp({ Component, pageProps, locale, messages }: CustomAppProps): JSX.Element {
    return (
        // see https://github.com/vercel/next.js/tree/master/examples/with-react-intl
        // for a complete strategy to couple next with react-intl
        // defaultLocale prevents missing message warning for locale defined in code,
        // see https://github.com/formatjs/formatjs/issues/251
        <IntlProvider locale={locale} defaultLocale={defaultLanguage} messages={messages}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {process.env.NEXT_PUBLIC_GTM_ID && (
                <>
                    <script>window.dataLayer = window.dataLayer || [];</script>
                    <Script
                        id="gtm-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                        <!-- Google Tag Manager -->
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
                        <!-- End Google Tag Manager -->`,
                        }}
                    />
                </>
            )}
            <GlobalStyle />
            <Component {...pageProps} />
        </IntlProvider>
    );
}

const getInitialProps: typeof App.getInitialProps = async (appContext) => {
    const locale = appContext.router.locale ?? defaultLanguage;

    const [appProps, messages] = await Promise.all([App.getInitialProps(appContext), getMessages()[locale]]);

    return { ...appProps, locale, messages };
};

CustomApp.getInitialProps = getInitialProps;
