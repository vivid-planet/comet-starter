import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { client } from "../../client";
import { scopeSchema } from "../../schemas";
import { createPageTreeNodeMutation } from "./createPageTreeNode.gql";

export function registerCreatePageTreeNode(server: McpServer): void {
    server.registerTool(
        "create_page_tree_node",
        {
            description: `Create a new page tree node. 

Parameters:
- name: Display name of the page
- slug: URL slug (must be unique within parent)
- documentType: "Page" or "Link"
- parentId: Parent node ID (omit for root level)
- pos: Position among siblings (optional)
- category: e.g. "mainNavigation" (default)
- hideInMenu: Whether to hide in navigation menus

The mutation automatically creates the attached document (Page or Link) with the given type.`,
            inputSchema: {
                name: z.string().describe("Display name of the page"),
                slug: z.string().describe("URL-safe slug"),
                documentType: z.enum(["Page", "Link"]).default("Page").describe('"Page" or "Link"'),
                scope: scopeSchema,
                parentId: z.string().optional().describe("Parent node ID for nesting"),
                pos: z.number().optional().describe("Position among siblings"),
                category: z.string().default("mainNavigation").describe("Node category"),
                hideInMenu: z.boolean().optional().describe("Hide this node in navigation menus"),
            },
        },
        async ({ name, slug, documentType, scope, parentId, pos, category, hideInMenu }) => {
            const input: Record<string, unknown> = {
                name,
                slug,
                attachedDocument: { type: documentType },
                ...(parentId !== undefined && { parentId }),
                ...(pos !== undefined && { pos }),
                ...(hideInMenu !== undefined && { hideInMenu }),
            };

            const data = await client.request(createPageTreeNodeMutation, { input, scope, category });
            return { content: [{ type: "text" as const, text: JSON.stringify(data.createPageTreeNode, null, 2) }] };
        },
    );
}
