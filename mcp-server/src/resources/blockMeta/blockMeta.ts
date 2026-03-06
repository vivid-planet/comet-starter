import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOCK_META_PATH = resolve(__dirname, "../block-meta.json");

export function registerBlockMetaResource(server: McpServer): void {
    server.registerResource(
        "block-meta",
        "comet://block-meta",
        {
            description:
                "Block schema metadata — field definitions, types, enums, and nesting for all CMS content blocks. Use this to construct valid save_page inputs. Fields named 'draftContent' with kind 'Json' contain Draft.js editor format (from the draft-js library).",
        },
        async () => {
            const content = await readFile(BLOCK_META_PATH, "utf-8");
            return { contents: [{ uri: "comet://block-meta", text: content, mimeType: "application/json" }] };
        },
    );
}
