import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import getPort, { portNumbers } from "get-port";

// Assigns a free, non-conflicting set of listening ports to .env.local so multiple checkouts
// of this repo can run in parallel. Only the raw *_PORT vars (plus INSTANCE_OFFSET) are written;
// the derived URL vars in .env (API_URL_INTERNAL, SITE_URL, IDP_SSO_URL, ...) expand from them
// automatically because .env.local is loaded before .env in the `dotenv -e ...` chain.

const ENV_LOCAL = resolve(process.cwd(), ".env.local");

const BLOCK_START = "# >>> auto-assigned ports (managed by assign-ports.ts; edit INSTANCE_OFFSET to pin) >>>";
const BLOCK_END = "# <<< auto-assigned ports <<<";

const OFFSET_STEP = 100;
const MAX_OFFSET = 2000;

// Listening/binding ports, in dependency-friendly order, with their .env defaults.
const PORTS = [
    ["POSTGRESQL_PORT", 5432],
    ["IMGPROXY_PORT", 6080],
    ["JAEGER_UI_PORT", 16686],
    ["JAEGER_OLTP_PORT", 4318],
    ["API_PORT", 4000],
    ["AUTHPROXY_PORT", 8000],
    ["ADMIN_PORT", 8001],
    ["SITE_PORT", 3000],
    ["IDP_PORT", 8080],
    ["VALKEY_PORT", 6379],
] as const satisfies ReadonlyArray<readonly [string, number]>;

type Assignment = { name: string; port: number; preferred: number };

// Resolve every port for a given offset, preferring `default + offset` and falling back within
// the same OFFSET_STEP-wide block. `clean` is true when every port got its preferred number.
async function resolveBlock(offset: number): Promise<{ assignments: Assignment[]; clean: boolean }> {
    const assignments: Assignment[] = [];
    let clean = true;
    for (const [name, def] of PORTS) {
        const preferred = def + offset;
        const port = await getPort({ port: portNumbers(preferred, preferred + OFFSET_STEP - 1) });
        if (port !== preferred) clean = false;
        assignments.push({ name, port, preferred });
    }
    return { assignments, clean };
}

function readEnvLocal(): string {
    if (!existsSync(ENV_LOCAL)) return "# override for local env\n";
    return readFileSync(ENV_LOCAL, "utf8");
}

function parseOffset(text: string): number | undefined {
    const match = text.match(/^\s*INSTANCE_OFFSET\s*=\s*(\d+)/m);
    return match ? Number(match[1]) : undefined;
}

// Remove our managed block and any stray INSTANCE_OFFSET line so the block stays the single owner.
function stripManaged(text: string): string {
    const out: string[] = [];
    let inBlock = false;
    for (const line of text.split("\n")) {
        if (line.trim() === BLOCK_START) {
            inBlock = true;
            continue;
        }
        if (inBlock) {
            if (line.trim() === BLOCK_END) inBlock = false;
            continue;
        }
        if (/^\s*INSTANCE_OFFSET\s*=/.test(line)) continue;
        out.push(line);
    }
    while (out.length && out[out.length - 1].trim() === "") out.pop();
    return out.join("\n");
}

function buildBlock(offset: number, assignments: Assignment[]): string {
    const lines = [BLOCK_START, `INSTANCE_OFFSET=${offset}`];
    for (const { name, port } of assignments) lines.push(`${name}=${port}`);
    lines.push(BLOCK_END);
    return lines.join("\n");
}

async function main(): Promise<void> {
    const existing = readEnvLocal();
    const pinnedOffset = parseOffset(existing);

    let offset: number;
    let assignments: Assignment[];

    if (pinnedOffset !== undefined) {
        // Respect an existing offset so a checkout keeps stable ports across restarts.
        offset = pinnedOffset;
        ({ assignments } = await resolveBlock(offset));
    } else {
        // Prefer offset 0 (the real defaults); bump by OFFSET_STEP until a fully-free block is found.
        let found: { offset: number; assignments: Assignment[] } | undefined;
        for (let candidate = 0; candidate <= MAX_OFFSET; candidate += OFFSET_STEP) {
            const { assignments: blockAssignments, clean } = await resolveBlock(candidate);
            if (clean) {
                found = { offset: candidate, assignments: blockAssignments };
                break;
            }
        }
        if (!found) {
            throw new Error(`Could not find a free port block within offset 0..${MAX_OFFSET}. Stop other instances or free up ports.`);
        }
        offset = found.offset;
        assignments = found.assignments;
    }

    const rest = stripManaged(existing);
    const block = buildBlock(offset, assignments);
    writeFileSync(ENV_LOCAL, `${rest}\n\n${block}\n`);

    console.log(`Assigned ports to .env.local (INSTANCE_OFFSET=${offset}):`);
    for (const { name, port } of assignments) console.log(`  ${name.padEnd(18)} ${port}`);
    const shifted = assignments.filter((assignment) => assignment.port !== assignment.preferred);
    if (shifted.length) {
        console.log(`Note: ${shifted.length} port(s) were busy at the preferred number and moved within their block.`);
    }
}

main().catch((error: unknown) => {
    console.error(`assign-ports failed: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
});
