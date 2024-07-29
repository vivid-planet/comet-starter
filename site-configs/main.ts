import { GetSiteConfig } from "../site-configs";

export default ((env) => {
    return {
        name: "Starter Main",
        domains: {
            main: "localhost:3000",
        },
        preloginEnabled: true,
        preloginPassword: env === "local" ? undefined : "password",
        public: {
            domain: "main",
            languages: ["en", "de"],
        },
    };
}) satisfies GetSiteConfig;
