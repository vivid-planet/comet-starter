import { Config } from "../site-configs";

export default {
    name: "Starter Secondary DE",
    contentScope: {
        domain: "secondary",
        language: "de",
    },
    domains: {
        local: "secondary.localhost:3000",
    },
} satisfies Config;
