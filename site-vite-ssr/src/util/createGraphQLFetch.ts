import {
    type SitePreviewData,
    createFetchWithDefaults,
    createFetchWithPreviewHeaders,
    createGraphQLFetch as createGraphQLFetchLibrary,
} from "@comet/cms-site";

export function createGraphQLFetch(previewData?: SitePreviewData) {
    if (typeof window !== "undefined") {
        throw new Error("createGraphQLFetch: cannot use on client side.");
    }

    const headers: HeadersInit = {
        authorization: `Basic ${Buffer.from(`vivid:${process.env.API_BASIC_AUTH_PASSWORD}`).toString("base64")}`,
        "x-relative-dam-urls": "1",
    };

    return createGraphQLFetchLibrary(
        createFetchWithDefaults(createFetchWithPreviewHeaders(fetch, previewData), {
            headers,
        }),
        `${process.env.API_URL_INTERNAL}/graphql`,
    );
}
