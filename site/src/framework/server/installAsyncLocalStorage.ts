import { AsyncLocalStorage } from "node:async_hooks";

declare global {
    var AsyncLocalStorage: typeof import("node:async_hooks").AsyncLocalStorage;
}

// React's server runtime only enables request storage (needed for `cache()` to work across `await`s) if AsyncLocalStorage is
// available as a global when it is evaluated. Next.js does the same. Must be imported before react-server-dom.
globalThis.AsyncLocalStorage ??= AsyncLocalStorage;
