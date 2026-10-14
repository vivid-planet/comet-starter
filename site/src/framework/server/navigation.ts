/**
 * Replacements for `notFound()` and `redirect()` from `next/navigation`.
 *
 * Both throw an error with a `digest`. React passes the digest through the RSC stream, so the request handler
 * (see entry.rsc.tsx) can turn it into a 404 page or a redirect response when the HTML shell fails to render.
 */

const NOT_FOUND_DIGEST = "NOT_FOUND";
const REDIRECT_DIGEST_PREFIX = "REDIRECT;";

class NavigationError extends Error {
    constructor(readonly digest: string) {
        super(digest);
    }
}

export function notFound(): never {
    throw new NavigationError(NOT_FOUND_DIGEST);
}

export function redirect(location: string, status: 301 | 302 | 303 | 307 | 308 = 307): never {
    throw new NavigationError(`${REDIRECT_DIGEST_PREFIX}${status};${location}`);
}

type NavigationTarget = { type: "notFound" } | { type: "redirect"; status: number; location: string };

export function getNavigationDigest(error: unknown): string | undefined {
    if (typeof error === "object" && error !== null && "digest" in error && typeof error.digest === "string") {
        const { digest } = error;
        if (digest === NOT_FOUND_DIGEST || digest.startsWith(REDIRECT_DIGEST_PREFIX)) {
            return digest;
        }
    }
    return undefined;
}

export function parseNavigationDigest(digest: string): NavigationTarget | undefined {
    if (digest === NOT_FOUND_DIGEST) {
        return { type: "notFound" };
    }
    if (digest.startsWith(REDIRECT_DIGEST_PREFIX)) {
        const [status, ...location] = digest.slice(REDIRECT_DIGEST_PREFIX.length).split(";");
        return { type: "redirect", status: Number(status), location: location.join(";") };
    }
    return undefined;
}
