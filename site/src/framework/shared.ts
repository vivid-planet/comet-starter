// Requests for the RSC payload (client side navigation) use the page path prefixed with /_rsc (e.g. /_rsc/en/about for /en/about),
// so CDNs cache them separately from the HTML without relying on headers
const RSC_PATH_PREFIX = "/_rsc";

export function toRscPath(pathname: string) {
    return `${RSC_PATH_PREFIX}${pathname}`;
}

/**
 * Returns the page path of an RSC payload request path, or undefined if the path isn't one
 */
export function fromRscPath(pathname: string): string | undefined {
    if (pathname === RSC_PATH_PREFIX || pathname.startsWith(`${RSC_PATH_PREFIX}/`)) {
        return pathname.slice(RSC_PATH_PREFIX.length) || "/";
    }
    return undefined;
}
