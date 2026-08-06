#!/usr/bin/env node
// Assigns a unique PORT_OFFSET so multiple instances of this project can run in parallel.
// The *_PORT values in .env embed the offset digit via ${PORT_OFFSET} (e.g. API_PORT=4${PORT_OFFSET}00).
// Prefers offset 0 (the .env default) and only writes a PORT_OFFSET override to .env.local when needed.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";

const ENV_FILE = ".env";
const ENV_LOCAL_FILE = ".env.local";
const PLACEHOLDER = "${PORT_OFFSET}";
const MAX_OFFSET = 9;

function fail(message: string): never {
    console.error(`Error: ${message}`);
    process.exit(1);
}

function readPortEntries(): { name: string; template: string }[] {
    if (!existsSync(ENV_FILE)) {
        fail(`No ${ENV_FILE} file found in ${process.cwd()}`);
    }

    return readFileSync(ENV_FILE, "utf8")
        .split("\n")
        .map((line) => /^([A-Z_]+_PORT)=(\S+)$/.exec(line.trim()))
        .filter((match) => match !== null)
        .map((match) => ({ name: match[1], template: match[2] }));
}

function portForOffset(entry: { name: string; template: string }, offset: number): number {
    const value = entry.template.replaceAll(PLACEHOLDER, String(offset));
    if (!/^\d+$/.test(value)) {
        fail(`${entry.name}=${entry.template} in ${ENV_FILE} does not resolve to a number (expected digits and ${PLACEHOLDER} only)`);
    }
    return Number(value);
}

// Node sets SO_REUSEADDR, so a wildcard bind coexists with specific-address binds (and vice versa).
// Probe all three addresses to also catch localhost-only listeners like Vite's dev server.
async function portIsFree(port: number): Promise<boolean> {
    for (const host of ["0.0.0.0", "127.0.0.1", "::1"]) {
        const free = await new Promise<boolean>((resolve) => {
            const server = createServer();
            server.once("error", (error: NodeJS.ErrnoException) => resolve(error.code !== "EADDRINUSE"));
            server.once("listening", () => server.close(() => resolve(true)));
            server.listen(port, host);
        });
        if (!free) return false;
    }
    return true;
}

async function findFreeOffset(entries: { name: string; template: string }[]): Promise<number> {
    for (let offset = 0; offset <= MAX_OFFSET; offset++) {
        let conflict: { name: string; port: number } | undefined;

        for (const entry of entries) {
            const port = portForOffset(entry, offset);
            if (!(await portIsFree(port))) {
                conflict = { name: entry.name, port };
                break;
            }
        }

        if (!conflict) return offset;

        console.error(`Offset ${offset} has a port conflict (${conflict.name}=${conflict.port} in use), trying next...`);
    }

    fail(`Could not find a free port offset (tried 0-${MAX_OFFSET})`);
}

function writeEnvLocal(entries: { name: string; template: string }[], offset: number): void {
    const existingLines = existsSync(ENV_LOCAL_FILE) ? readFileSync(ENV_LOCAL_FILE, "utf8").split("\n") : [];

    // Drop any existing PORT_OFFSET and *_PORT assignments from .env.local to avoid duplicates/stale overrides
    const names = new Set(["PORT_OFFSET", ...entries.map((entry) => entry.name)]);
    const keptLines = existingLines.filter((line) => !names.has(line.split("=")[0].trim()));

    while (keptLines.length > 0 && keptLines[keptLines.length - 1] === "") {
        keptLines.pop();
    }

    // Offset 0 means the base ports are free, so no override is written and the .env default applies
    const lines = offset === 0 ? keptLines : [...keptLines, `PORT_OFFSET=${offset}`];

    if (lines.length === 0 && existingLines.length === 0) return;

    writeFileSync(ENV_LOCAL_FILE, lines.length > 0 ? `${lines.join("\n")}\n` : "");
}

async function main(): Promise<void> {
    const entries = readPortEntries();
    if (entries.length === 0) {
        fail(`No *_PORT entries found in ${ENV_FILE}`);
    }
    if (!entries.some((entry) => entry.template.includes(PLACEHOLDER))) {
        fail(`No *_PORT entry in ${ENV_FILE} contains ${PLACEHOLDER}, so ports cannot be offset`);
    }

    const offset = await findFreeOffset(entries);
    writeEnvLocal(entries, offset);

    if (offset === 0) {
        console.error(`All base ports are free, using PORT_OFFSET=0 (${ENV_FILE} default applies)`);
    } else {
        console.error(`PORT_OFFSET=${offset} written to ${ENV_LOCAL_FILE}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
