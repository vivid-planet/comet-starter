import { Command } from "commander";
import kleur from "kleur";

import { createApp } from "./scripts/create-app/createApp";
import { removeShowcaseContent } from "./scripts/remove-showcase/removeShowcase";
import { removeSite } from "./scripts/remove-site/removeSite";
import { cwdIsCometProject } from "./util/cwdIsCometProject";
import { isValidNodeVersion } from "./util/isValidNodeVersion";
import { isValidProjectName } from "./util/isValidProjectName";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require("../package.json");

if (!isValidNodeVersion()) {
    console.error("Invalid Node Version (your Node.js version is prior to v20).");
    process.exit(1);
}

void (async () => {
    const program = new Command();
    program.name(name).description("CLI to create a Comet app").version(version);
    program
        .argument("<projectName>", "Sets the name of the project.")
        .option("-v, --verbose", "Enables extra console logs for verbose output.")
        .option("-ni, --no-install", "Disables the automatic installation of dependencies.")
        .action((projectName: string, options) => {
            if (isValidProjectName(projectName)) {
                createApp({ projectName, verbose: options.verbose, install: options.install });
            } else {
                program.error("Please provide a valid project name.");
            }
        })
        .configureOutput({ outputError: (str, write) => write(kleur.bgRed(str)) });

    program.addCommand(
        new Command("remove-showcase").option("-v, --verbose", "Enables extra console logs for verbose output.").action((options) => {
            if (!cwdIsCometProject()) {
                program.error("This command must be run from the root of a Comet project.");
            }

            console.log("Removing showcase content from project...");
            removeShowcaseContent(options.verbose);
        }),
    );

    program.addCommand(
        new Command("remove-site").option("-v, --verbose", "Enables extra console logs for verbose output.").action((options) => {
            if (!cwdIsCometProject()) {
                program.error(`This command must be run from the root of a Comet project.`);
            }

            console.log("Removing site from project...");
            removeSite(options.verbose);
        }),
    );
    program.parse();
})();
