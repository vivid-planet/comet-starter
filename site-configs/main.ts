import { Environment, GetSiteConfig } from "./site-configs";

const envToDomainMap: Record<Environment, string> = {
    //local: "localhost:3000",
    local: `${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
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
            preliminary: env === "prod" ? "preliminary.comet-dxp.com" : undefined, // preliminary domain activates prelogin automatically
            additional: ["localhost:3000", "127.0.0.1:3000"],
        },
        preloginEnabled: env !== "local" && env !== "prod",
        preloginPassword: undefined,
        public: {
            scope: {
                domain: "main",
                languages: ["en", "de"],
            },
            gtmId: "GTM-XXXX",
        },
    };
}) satisfies GetSiteConfig;
