import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import type { Plugin } from "vite";

const gqlTagPattern = /gql`([\s\S]*?)`/gm;
const fragmentPattern = /^\s*fragment\s+(\w+)\s+on\s+\w+/;
const sourceFilePattern = /\.[jt]sx?$/;

function hashQuery(query: string) {
    return createHash("sha256").update(query).digest("hex");
}

function findSourceFiles(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            return findSourceFiles(path);
        }
        return sourceFilePattern.test(entry.name) ? [path] : [];
    });
}

/**
 * Vite port of the webpack loader `@dextinity/site-react/webpackPersistedQueriesLoader`.
 *
 * In the browser bundle, gql`...` queries are replaced with their hash. The queries are written to `persistedQueriesPath`, which is read
 * by the GraphQL proxy route (persistedQueryRoute). This way the browser can only execute queries known at build time.
 */
export function persistedQueriesPlugin({ include, persistedQueriesPath }: { include: string; persistedQueriesPath: string }): Plugin {
    let queries: Record<string, string> = {};

    function writeQueries() {
        mkdirSync(dirname(persistedQueriesPath), { recursive: true });
        writeFileSync(persistedQueriesPath, JSON.stringify(queries, null, 2));
    }

    return {
        name: "dextinity:persisted-queries",
        enforce: "pre",
        applyToEnvironment: (environment) => environment.name === "client",
        buildStart() {
            queries = {};
            if (this.environment.mode === "dev") {
                // In development, modules are transformed lazily when the browser requests them. But the GraphQL route reads the queries only
                // once, so collect all queries upfront. This includes server-only queries, which is fine for development.
                for (const file of findSourceFiles(include)) {
                    for (const [, query] of readFileSync(file, "utf-8").matchAll(gqlTagPattern)) {
                        if (!fragmentPattern.test(query)) {
                            queries[hashQuery(query)] = query;
                        }
                    }
                }
            }
            writeQueries();
        },
        transform(code, id) {
            const file = id.split("?")[0];
            if (!file.startsWith(include) || !sourceFilePattern.test(file) || !code.includes("gql`")) {
                return;
            }

            const transformedCode = code.replace(gqlTagPattern, (_match, query: string) => {
                const fragmentVariables = Array.from(query.matchAll(/\${.*?}/g))
                    .map((match) => match[0])
                    .join(" ");
                if (fragmentPattern.test(query)) {
                    return `{ fragment: true, fragmentVariables: \`${fragmentVariables}\` }`;
                }
                const hash = hashQuery(query);
                queries[hash] = query;
                return `{ hash: "${hash}", fragmentVariables: \`${fragmentVariables}\` }`;
            });

            if (this.environment.mode === "dev") {
                writeQueries();
            }
            return { code: transformedCode, map: null };
        },
        generateBundle() {
            writeQueries();
        },
    };
}
