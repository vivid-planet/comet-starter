import { ContentScope, ContentScopeProvider } from "@src/common/contentScope/ContentScope";
import { defaultLanguage, domain } from "@src/config";
import { getMessages } from "@src/lang";
import App, { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import Script from "next/script";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* Fix a problem with Flexbox to avoid overflows: https://defensivecss.dev/tip/flexbox-min-content-size/ */
    * {
        min-width: 0;
    }

    /* Prevent font size adjustments after orientation changes in mobile devices*/
    html {
        -webkit-text-size-adjust: 100%;
    }

    body {
        margin: 0;
        /* Improve text rendering with font-smoothing */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
    }

    /* Prevent sub and sup elements from affecting the line height in all browsers */
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }

    button,
    input,
    select,
    textarea {
        /* Use the application's default font for form elements */
        font: inherit;

        /* Remove default border-radius that is added by iOS Safari */
        border-radius: 0;
    }

    /* Improve media defaults */
    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    /*
        Create a root stacking context: https://www.joshwcomeau.com/css/custom-css-reset/#eight-root-stacking-context-9
    */
    #root,
    #__next {
        isolation: isolate;
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
    scope: ContentScope;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any;
}

export default function CustomApp({ Component, pageProps, scope, messages }: CustomAppProps): JSX.Element {
    return (
        // see https://github.com/vercel/next.js/tree/master/examples/with-react-intl
        // for a complete strategy to couple next with react-intl
        <IntlProvider locale={scope.language} messages={messages}>
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
            <ContentScopeProvider scope={scope}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ContentScopeProvider>
        </IntlProvider>
    );
}

const getInitialProps: typeof App.getInitialProps = async (appContext) => {
    let scope: ContentScope;

    if (typeof appContext.router.query.domain === "string" && typeof appContext.router.query.language === "string") {
        // Site preview
        scope = { domain: appContext.router.query.domain, language: appContext.router.query.language };
    } else {
        // Live site
        const language = appContext.router.locale ?? defaultLanguage;
        scope = { domain, language };
    }

    const [appProps, messages] = await Promise.all([App.getInitialProps(appContext), getMessages(scope)]);

    return { ...appProps, scope, messages };
};

CustomApp.getInitialProps = getInitialProps;
