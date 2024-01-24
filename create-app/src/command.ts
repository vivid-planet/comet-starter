import { Command } from "commander";
import kleur from "kleur";

import { createApp } from "./scripts/create-app/createApp";
import { removeShowcaseContent } from "./scripts/remove-showcase/removeShowcase";
import { removeSite } from "./scripts/remove-site/removeSite";
import { isValidNodeVersion } from "./util/isValidNodeVersion";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require("../package.json");

function isValidProjectName(value: string): boolean {
    const allowedFormat = /^[A-Za-z0-9][A-Za-z0-9-]*$/;
    return allowedFormat.test(value);
}

void (async () => {
    const program = new Command();
    if (!isValidNodeVersion()) {
        console.log(kleur.bgRed("Invalid Node Version (your Node.js version is prior to v18)."));
        return;
    }

    program.name(name).description("CLI to create a comet app").version(version);
    program
        .argument("<projectName>", "Sets the name of the project.")
        .option("-v, --verbose", "Enables extra console logs for verbose output.")
        .action((projectName: string, options) => {
            if (isValidProjectName(projectName)) {
                createApp({ projectName, verbose: options.verbose });
            } else {
                console.log(kleur.bgRed("Please provide a valid project name."));
            }
        });

    program.addCommand(
        new Command("remove-showcase").action(() => {
            console.log(kleur.white(`Removing showcase content from project`));
            removeShowcaseContent();
        }),
    );

    program.addCommand(
        new Command("remove-site").action(() => {
            console.log(kleur.white(`Removing site from project`));
            removeSite();
        }),
    );

    program.parse();
})();
