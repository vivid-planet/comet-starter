import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { client } from "../../client";
import { savePageMutation } from "./savePage.gql";

export function registerSavePage(server: McpServer): void {
    server.registerTool(
        "save_page",
        {
            description: `Save page content (content blocks, SEO, stage) for an existing page document.

The pageId is the document ID from the page tree node's "document.id" field.
If the page document does not exist yet, pass attachedPageTreeNodeId to create and attach it.

Read the block-meta resource (comet://block-meta) to understand the available block types, their fields, nesting, and valid values. Use it to construct valid content, seo, and stage inputs.

Each block in a blocks-block array needs a "key" (uuid), "visible" (boolean), "type" (string), and "props" (object matching the block's fields from block-meta).`,
            inputSchema: {
                pageId: z.string().describe("The page document ID (UUID)"),
                input: z.object({
                    content: z.any().describe("PageContentBlock JSON"),
                    seo: z.any().describe("SeoBlock JSON"),
                    stage: z.any().describe("StageBlock JSON"),
                }),
                attachedPageTreeNodeId: z.string().optional().describe("Page tree node ID to attach this page to"),
            },
        },
        async ({ pageId, input, attachedPageTreeNodeId }) => {
            const data = await client.request(savePageMutation, { pageId, input, attachedPageTreeNodeId });
            return { content: [{ type: "text" as const, text: JSON.stringify(data.savePage, null, 2) }] };
        },
    );
}
