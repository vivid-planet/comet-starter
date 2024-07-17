import { sitePreviewRoute } from "@src/temp/site-preview-route";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    return sitePreviewRoute(request, createGraphQLFetch());
}
