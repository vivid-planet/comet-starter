import { createCache } from "cache-manager";
import Keyv from "keyv";

export const memoryCache = createCache({
    stores: [new Keyv()],
    ttl: 15 * 60 * 1000, // 15 minutes
    refreshThreshold: 5 * 60 * 1000, // refresh if less than 5 minutes TTL are remaining
});

memoryCache.on("refresh", ({ error }) => {
    if (error) {
        console.error("Error refreshing cache in background", error);
    }
});
