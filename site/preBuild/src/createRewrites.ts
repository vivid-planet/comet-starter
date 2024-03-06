import { Rewrite } from "next/dist/lib/load-custom-routes";

import { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from "../../src/blocks.generated";
import { getRedirects } from "./createRedirects";

const createRewrites = async () => {
    const apiUrl = process.env.API_URL_INTERNAL;
    if (!apiUrl) {
        console.error("No Environment Variable API_URL_INTERNAL available. Can not perform redirect config");
        return { redirects: [], rewrites: [] };
    }

    const rewrites: Rewrite[] = [];

    for await (const redirect of getRedirects()) {
        let source: string | undefined;
        let destination: string | undefined;

        if (redirect.sourceType === "path") {
            source = redirect.source;
        }

        const target = redirect.target as RedirectsLinkBlockData;

        if (target.block !== undefined) {
            switch (target.block.type) {
                case "internal":
                    destination = (target.block.props as InternalLinkBlockData).targetPage?.path;
                    break;

                case "external":
                    destination = (target.block.props as ExternalLinkBlockData).targetUrl;
                    break;
            }
        }

        if (source && destination && source.toLowerCase() === destination.toLowerCase()) {
            const firstChar = source.charAt(1);

            const pattern = new RegExp(`(${firstChar.toLowerCase()}|${firstChar.toUpperCase()})`, "g");

            rewrites.push({ source: source.replace(pattern, "($1)"), destination });
        }
    }

    return rewrites;
};

export { createRewrites };
