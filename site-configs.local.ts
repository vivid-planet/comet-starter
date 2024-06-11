import { SiteConfig } from "./site-configs.types";

// Fallback, if directory ./site-configs exists, this file will not be used and should be deleted
export default [
    {
        name: "Starter Main/DE",
        contentScope: {
            domain: "main",
            language: "de",
        },
        domains: {
            main: "localhost:3000",
            preview: "",
        },
    },
    {
        name: "Starter Main/EN",
        contentScope: {
            domain: "main",
            language: "en",
        },
        domains: {
            main: "en.localhost:3000",
            preview: "",
        },
    },
    {
        name: "Starter Secondary/DE",
        contentScope: {
            domain: "secondary",
            language: "de",
        },
        domains: {
            main: "secondary-de.localhost:3000",
            preview: "",
        },
    },
    {
        name: "Starter Secondary/EN",
        contentScope: {
            domain: "secondary",
            language: "en",
        },
        domains: {
            main: "secondary-en.localhost:3000",
            preview: "",
        },
    },
] satisfies SiteConfig[];
