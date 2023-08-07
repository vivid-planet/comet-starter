import { GraphQLClient } from "graphql-request";

interface GraphQLClientOptions {
    includeInvisiblePages: boolean;
    includeInvisibleBlocks: boolean;
    previewDamUrls: boolean;
}
const defaultOptions: GraphQLClientOptions = {
    includeInvisiblePages: false,
    includeInvisibleBlocks: false,
    previewDamUrls: false,
};
export function createGraphQLClient(options: Partial<GraphQLClientOptions> = {}) {
    const { includeInvisibleBlocks, includeInvisiblePages, previewDamUrls } = { ...defaultOptions, ...options };

    const headers: Record<string, string> = {
        authorization: `Basic ${Buffer.from(`vivid:${process.env.API_PASSWORD}`).toString("base64")}`,
    };

    const includeInvisibleBlocksHeaderEntries: string[] = [];

    if (includeInvisiblePages) {
        includeInvisibleBlocksHeaderEntries.push("Pages:Unpublished");
    }

    if (includeInvisibleBlocks) {
        includeInvisibleBlocksHeaderEntries.push("Blocks:Invisible");
    }

    // tells api to send invisble content
    // authentication is required when this header is used
    if (includeInvisibleBlocksHeaderEntries.length > 0) {
        headers["x-include-invisible-content"] = includeInvisibleBlocksHeaderEntries.join(",");
    }

    // tells api to create preview image urls
    // authentication is required when this header is used
    if (previewDamUrls) {
        headers["x-preview-dam-urls"] = "1";
    }

    return new GraphQLClient(`${process.env.API_URL_INTERNAL}/graphql`, {
        headers,
    });
}
