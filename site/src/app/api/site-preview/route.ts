import { sitePreviewRoute } from "@src/temp/site-preview-route";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    return sitePreviewRoute(request, createGraphQLFetch(), {
        basePath: (request) => {
            const scopeString = request.nextUrl.searchParams.get("scope");

            if (scopeString === null) {
                throw new Error("Missing scope param");
            }

            const scope: { language?: string } = JSON.parse(scopeString);
            return scope.language ?? "";
        },
    });
}
