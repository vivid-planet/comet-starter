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

// Called by `npx @comet/cli inject-site-configs`
const getSiteConfigs = async (env: Environment): Promise<SiteConfig[]> => {
    const path = `${__dirname}/site-configs`;

    const files = (await fs.readdir(path)).filter((file) => !file.startsWith("_"));
    const imports = (await Promise.all(files.map((file) => import(`${path}/${file}`)))) as { default: Config }[];
    return imports.map((imprt, index) => {
        const { domains, ...site } = imprt.default;

        return {
            ...site,
            domains: {
                main: domains[env] ?? "",
                preliminary: env === "prod" ? domains["preliminary"] : undefined,
            },
            preloginEnabled: env === "prod" ? site.preloginEnabled : true,
            public: {
                domain: site.domain,
                languages: site.languages,
            }
        }
    });
};
export default getSiteConfigs;
