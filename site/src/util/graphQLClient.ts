import {
    createFetchWithDefaults,
    createFetchWithPreviewHeaders,
    createGraphQLFetch as createGraphQLFetchLibrary,
    SitePreviewData,
} from "@comet/cms-site";

const isServerSide = typeof window === "undefined";
export const graphQLApiUrl = `${isServerSide ? process.env.API_URL_INTERNAL : process.env.NEXT_PUBLIC_API_URL}/graphql`;
export function createGraphQLFetch(previewData?: SitePreviewData) {
    const headers: HeadersInit = {
        "x-relative-dam-urls": "1",
    };

    if (isServerSide) {
        headers.authorization = `Basic ${Buffer.from(`system-user:${process.env.API_BASIC_AUTH_SYSTEM_USER_PASSWORD}`).toString("base64")}`;
    }

    return createGraphQLFetchLibrary(
        // set a default revalidate time of 7.5 minutes to get an effective cache duration of 15 minutes if a CDN cache is enabled
        // see cache-handler.ts for maximum cache duration (24 hours)
        createFetchWithDefaults(createFetchWithPreviewHeaders(fetch, previewData), { next: { revalidate: 7.5 * 60 }, headers }),
        graphQLApiUrl,
    );
}
