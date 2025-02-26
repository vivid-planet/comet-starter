import { Environment, GetSiteConfig } from "./site-configs";

const envToDomainMap: Record<Environment, string> = {
    local: "secondary.localhost:3000",
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
