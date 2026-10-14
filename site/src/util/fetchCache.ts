import "server-only";

import { createHash } from "node:crypto";

import { Redis } from "ioredis";
import { LRUCache } from "lru-cache";

/**
 * Replacement for the Next.js data cache (`fetch` with `cache: "force-cache"` and `next.revalidate`), including the Valkey cache
 * handler (previously cache-handler.ts).
 *
 * Responses are cached for `revalidateSeconds`. After that they are still served (stale-while-revalidate) while being refetched in the
 * background, until they expire after `CACHE_TTL_IN_S`. Concurrent identical requests are deduplicated.
 */

type CacheEntry = {
    storedAt: number;
    status: number;
    headers: Array<[string, string]>;
    body: string;
};

const CACHE_TTL_IN_S = 24 * 60 * 60; // 1 day

interface CacheStore {
    get(key: string): Promise<CacheEntry | undefined>;
    set(key: string, entry: CacheEntry): Promise<void>;
}

function createMemoryStore(): CacheStore & { cache: LRUCache<string, CacheEntry> } {
    const cache = new LRUCache<string, CacheEntry>({
        maxSize: 50 * 1024 * 1024, // 50MB
        sizeCalculation: (entry) => entry.body.length || 1,
        ttl: CACHE_TTL_IN_S * 1000,
        ttlAutopurge: true,
    });
    return {
        cache,
        get: async (key) => cache.get(key),
        set: async (key, entry) => {
            cache.set(key, entry);
        },
    };
}

function createValkeyStore(): CacheStore {
    const { VALKEY_HOST, VALKEY_PASSWORD } = process.env;
    if (!VALKEY_HOST) {
        throw new Error("VALKEY_HOST is required");
    }
    if (!VALKEY_PASSWORD) {
        throw new Error("VALKEY_PASSWORD is required");
    }

    const redis = new Redis({
        enableOfflineQueue: false,
        host: VALKEY_HOST,
        keyPrefix: process.env.VALKEY_KEY_PREFIX || "",
        password: VALKEY_PASSWORD,
        port: parseInt(process.env.VALKEY_PORT || "6379", 10),
        enableAutoPipelining: true,
    });

    // Used while Valkey is not available
    const fallbackStore = createMemoryStore();
    let isFallbackInUse = false;

    function getFallbackStore() {
        if (!isFallbackInUse) {
            console.warn(`${new Date().toISOString()} | [${VALKEY_HOST} down] switching to fallback in-memory cache`);
            isFallbackInUse = true;
        }
        return fallbackStore;
    }

    return {
        async get(key) {
            if (redis.status !== "ready") {
                return getFallbackStore().get(key);
            }
            try {
                const value = await redis.get(key);
                if (isFallbackInUse) {
                    isFallbackInUse = false;
                    console.info(`${new Date().toISOString()} [${VALKEY_HOST} up] Switching back to redis cache`);
                }
                return value ? (JSON.parse(value) as CacheEntry) : undefined;
            } catch (error) {
                console.error("fetchCache.get error", error);
                return getFallbackStore().get(key);
            }
        },
        async set(key, entry) {
            if (redis.status !== "ready") {
                return getFallbackStore().set(key, entry);
            }
            try {
                await redis.set(key, JSON.stringify(entry), "EX", CACHE_TTL_IN_S);
            } catch (error) {
                console.error("fetchCache.set error", error);
            }
        },
    };
}

let store: CacheStore | undefined;
function getStore() {
    if (!store) {
        store = process.env.VALKEY_ENABLED === "true" ? createValkeyStore() : createMemoryStore();
    }
    return store;
}

function hasGraphQLErrors(body: string) {
    if (!body.startsWith("{")) {
        return false;
    }
    try {
        return Boolean(JSON.parse(body).errors);
    } catch {
        return false;
    }
}

function createCacheKey(input: RequestInfo | URL, init?: RequestInit) {
    const request = new Request(input, init);
    const headers = Array.from(request.headers.entries()).sort(([a], [b]) => a.localeCompare(b));
    const body = typeof init?.body === "string" ? init.body : "";
    return `fetch:${createHash("sha256")
        .update(JSON.stringify([request.method, request.url, headers, body]))
        .digest("hex")}`;
}

function toResponse(entry: CacheEntry) {
    return new Response(entry.body, { status: entry.status, headers: entry.headers });
}

const inflightRequests = new Map<string, Promise<CacheEntry>>();

export function createCachingFetch(fetch: typeof globalThis.fetch, { revalidateSeconds }: { revalidateSeconds: number }): typeof globalThis.fetch {
    return async (input, init) => {
        const key = createCacheKey(input, init);

        function load() {
            let promise = inflightRequests.get(key);
            if (!promise) {
                promise = (async () => {
                    const response = await fetch(input, init);
                    const entry: CacheEntry = {
                        storedAt: Date.now(),
                        status: response.status,
                        headers: Array.from(response.headers.entries()),
                        body: await response.text(),
                    };
                    if (!response.ok) {
                        // Don't cache errors
                    } else if (hasGraphQLErrors(entry.body)) {
                        // Must not cache GraphQL errors
                        console.error("fetchCache: GraphQL error, not caching response", entry.body.slice(0, 1000));
                    } else {
                        await getStore().set(key, entry);
                    }
                    return entry;
                })().finally(() => inflightRequests.delete(key));
                inflightRequests.set(key, promise);
            }
            return promise;
        }

        const cachedEntry = await getStore().get(key);
        if (cachedEntry) {
            if (Date.now() - cachedEntry.storedAt > revalidateSeconds * 1000) {
                // Stale: serve from cache, refetch in background
                load().catch((error) => console.error("fetchCache: background revalidation failed", error));
            }
            return toResponse(cachedEntry);
        }

        return toResponse(await load());
    };
}
