import fs from "fs";
import { SiteConfig } from "./site-configs.types";

// Types for files in site-configs/
type Environment = "local" | "dev" | "test" | "staging" | "prod";
export type Config = Omit<SiteConfig, "domains"> & {
    preLoginPassword?: string;
    domains: {
        preliminary?: string;
    } & {
        [key in Environment]?: string;
    };
};

// Called by `npx @comet/cli inject-site-configs`
const getSiteConfigs = async (env: Environment): Promise<SiteConfig[]> => {
    const path = `${__dirname}/site-configs`;

    const files = fs.readdirSync(path).filter((file) => !file.startsWith("_"));
    const imports = (await Promise.all(files.map((file) => import(`${path}/${file}`)))) as { default: Config }[];
    return imports.map((imprt, index) => {
        const { domains, ...site } = imprt.default;

        const ret: SiteConfig = {
            ...site,
            domains: {
                main: domains[env] ?? "",
                preliminary: env === "prod" ? domains["preliminary"] : undefined,
                preview: "", // TODO Remove once https://github.com/vivid-planet/comet/pull/2163 is available
            },
            preloginEnabled: env === "prod" ? site.preloginEnabled : true,
        };

        return ret;
    });
};
export default getSiteConfigs;
