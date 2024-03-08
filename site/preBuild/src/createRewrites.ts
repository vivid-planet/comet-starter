import { Rewrite } from "next/dist/lib/load-custom-routes";

import { getRedirects } from "./createRedirects";

const createRewrites = async () => {
    const apiUrl = process.env.API_URL_INTERNAL;
    if (!apiUrl) {
        console.error("No Environment Variable API_URL_INTERNAL available. Can not perform redirect config");
        return { redirects: [], rewrites: [] };
    }

    const rewrites: Rewrite[] = [];

    for await (const redirect of getRedirects()) {
        const { source, destination } = redirect;

        if (source && destination && source.toLowerCase() === destination.toLowerCase()) {
            const firstChar = source.charAt(1);

            const pattern = new RegExp(`(${firstChar.toLowerCase()}|${firstChar.toUpperCase()})`, "g");

            rewrites.push({ source: source.replace(pattern, "($1)"), destination });
        }
    }

    return rewrites;
};

export { createRewrites };
