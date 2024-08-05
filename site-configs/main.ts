import { Environment, GetSiteConfig } from "../site-configs";

const envToDomainMap: Record<Environment, string> = {
    local: "localhost:3000",
    dev: "dev.comet-dxp.com",
    test: "test.comet-dxp.com",
    staging: "staging.comet-dxp.com",
    prod: "comet-dxp.com",
};

export default ((env) => {
    return {
        name: "Starter Main",
        domains: {
            main: envToDomainMap[env],
        },
        preloginEnabled: true,
        preloginPassword: env === "local" ? undefined : "password",
        public: {
            scope: {
                domain: "main",
                languages: ["en", "de"],
            },
        },
    };
}) satisfies GetSiteConfig;
