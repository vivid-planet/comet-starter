import { execSync } from "child_process";
import fs from "fs";
import kleur from "kleur";

import { hasDependenciesInstalled } from "./hasDependenciesInstalled";

export function runEslintFix(verbose: boolean) {
    const microservices = ["admin", "api", "site"];

    for (const microservice of microservices) {
        if (!fs.existsSync(microservice)) {
            continue;
        } else if (!hasDependenciesInstalled(microservice)) {
            if (verbose) {
                console.log(kleur.grey(`Skipping ESLint fix in ${microservice} because dependencies are not installed.`));
            }
            continue;
        }

        try {
            if (microservice !== "api") execSync(`npm --prefix ${microservice} run prelint`);
            execSync(`npm run --prefix ${microservice} lint:eslint -- --fix`);
        } catch (err) {
            console.log(kleur.yellow(`Failed to fix ESLint errors in ${microservice}.`));
            if (verbose) {
                console.log(kleur.grey(`${err}`));
            }
        }
    }
}
