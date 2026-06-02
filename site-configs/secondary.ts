import { Environment, GetSiteConfig } from "./site-configs";

const host = process.env.SERVER_HOST ?? "localhost";
const port = parseInt(process.env.SITE_PORT || "3000", 10);

const envToDomainMap: Record<Environment, string> = {
    local: `secondary.${host}:${port}`,
    dev: "dev-secondary.comet-dxp.com",
    test: "test-secondary.comet-dxp.com",
    staging: "staging-secondary.comet-dxp.com",
    prod: "secondary.comet-dxp.com",
};

export default ((env) => {
    return {
        name: "Starter Secondary",
        domains: {
            main: envToDomainMap[env],
        },
        preloginEnabled: env !== "local" && env !== "prod",
        preloginPassword: undefined,
        public: {
            scope: {
                domain: "secondary",
                languages: ["en", "de"],
            },
            gtmId: "GTM-YYYY",
        },
    };
}) satisfies GetSiteConfig;
