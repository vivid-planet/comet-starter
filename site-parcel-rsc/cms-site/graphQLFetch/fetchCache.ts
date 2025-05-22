type Fetch = typeof fetch;

type CacheBackend = {
    get: (key: string) => Promise<Response | undefined>;
    set: (key: string, value: Response) => Promise<void>;
};

export function createFetchCache(fetch: Fetch, cache: CacheBackend): Fetch {
    return async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
        let cacheKey: string | undefined;
        if (init?.cache === "no-store") {
            //don't cache no-store requests
        } else if (init?.method?.toUpperCase() === "GET") {
            //cache all get requests
            cacheKey = input.toString();
        } else if (init?.body) {
            const bodyString = init.body.toString();
            if (bodyString.startsWith("{")) {
                try {
                    const body = JSON.parse(init.body.toString());
                    if (body.query && body.variables) {
                        //looks like a gql query, cache any method
                        cacheKey = `${input.toString()}#${init.body.toString()}`;
                    }
                } catch {
                    //not a valid json
                }
            }
        }
        if (!cacheKey) {
            return fetch(input, init);
        }

        const cachedResponse = await cache.get(cacheKey)
        if (cachedResponse) {
            return cachedResponse;
        } else {
            const fetchPromise = fetch(input, init);
            const response = await fetchPromise;
            cache.set(cacheKey, response);
            return fetchPromise;
        }
    };
}
