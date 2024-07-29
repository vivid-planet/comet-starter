import { GetSiteConfig } from "../site-configs";

export default ((env) => {
    return {
        name: "Starter Secondary",
        domains: {
            main: "secondary.localhost:3000",
        },
        preloginEnabled: true,
        preloginPassword: env === "local" ? undefined : "password",
        public: {
            domain: "secondary",
            languages: ["en", "de"],
        },
    };
}) satisfies GetSiteConfig;
