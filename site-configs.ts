import fs from "fs/promises";
import { SiteConfig } from "./site-configs.d";

// Types for files in site-configs/
type Environment = "local" | "dev" | "test" | "staging" | "prod";
export type Config = Omit<SiteConfig, "domains" | "contentScope"> & {
    languages: string[];
    contentScope: {
        domain: string;
    };
    domains: {
        preliminary?: string;
    } & {
        [key in Environment]?: string;
    };
};

const getUrlFromDomain = (domain: string): string => {
    return domain.includes("localhost") ? `http://${domain}` : `https://${domain}`;
};

// Called by `npx @comet/cli inject-site-configs`
const getSiteConfigs = async (env: Environment): Promise<SiteConfig[]> => {
    const path = `${__dirname}/site-configs`;

    const files = (await fs.readdir(path)).filter((file) => !file.startsWith("_"));
    const imports = (await Promise.all(files.map((file) => import(`${path}/${file}`)))) as { default: Config }[];
    return imports.flatMap((imprt, index) => {
        const { domains, ...site } = imprt.default;
        const languages = site.languages

        const ret = languages.map((language):SiteConfig => {
            return {
                ...site,
                name: `${site.name} ${language.toUpperCase()}`,
                contentScope: {
                    domain: site.contentScope.domain,
                    language,
                },
                domains: {
                    main: `${domains[env]}/${language}` ?? "",
                    preliminary: env === "prod" ? `${domains["preliminary"]}/${language}` : undefined,
                },
                preloginEnabled: env === "prod" ? site.preloginEnabled : true,
                public: {
                    previewUrl: getUrlFromDomain(domains[env] ?? ""),
                }
            }
        })

        return ret;
    });
};
export default getSiteConfigs;
