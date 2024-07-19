import fs from "fs/promises";
import { SiteConfig } from "./site-configs.d";

// Types for files in site-configs/
type Environment = "local" | "dev" | "test" | "staging" | "prod";
export type Config = Omit<SiteConfig, "domains" | "public"> & Pick<SiteConfig["public"], "domain" | "languages"> & {
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
    return imports.map((imprt, index) => {
        const { domains, ...site } = imprt.default;

        const contentScopes = site.languages.map(
            (language) => ({
                domain: site.domain,
                language,
            })
        );

        return {
            ...site,
            name: `${site.name}`,
            domains: {
                main: domains[env] ?? "",
                preliminary: env === "prod" ? domains["preliminary"] : undefined,
            },
            preloginEnabled: env === "prod" ? site.preloginEnabled : true,
            public: {
                previewUrl: getUrlFromDomain(domains[env] ?? ""),
                domain: site.domain,
                languages: site.languages,
                contentScopes,
            }
        }
    });
};
export default getSiteConfigs;
