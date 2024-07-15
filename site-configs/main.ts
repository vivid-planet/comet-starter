import { Config } from "../site-configs";

export default {
    name: "Starter Main",
    contentScope: {
        domain: "main",
    },
    languages: ["en", "de"],
    domains: {
        local: "localhost:3000",
    },
} satisfies Config;
