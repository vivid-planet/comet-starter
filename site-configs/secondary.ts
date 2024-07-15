import { Config } from "../site-configs";

export default {
    name: "Starter Secondary",
    contentScope: {
        domain: "secondary",
    },
    languages: ["en", "de"],
    domains: {
        local: "secondary.localhost:3000",
    },
} satisfies Config;
