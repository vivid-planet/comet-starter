import { readFile } from "fs/promises";
import { serverOnly$ } from "vite-env-only/macros";

const messagesCache: Record<string, unknown> = {};

export const loadMessages = serverOnly$(async (language: string) => {
    if (messagesCache[language]) return messagesCache[language];
    const path = `./lang-compiled/${language}.json`;
    const messages = JSON.parse(await readFile(path, "utf8"));
    messagesCache[language] = messages;
    return messages;
});
