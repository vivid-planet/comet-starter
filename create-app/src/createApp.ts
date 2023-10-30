import { Command } from "commander";
import kleur from "kleur";
import { createSpinner } from "nanospinner";
import process from "process";

import { cleanupWorkingDirectory } from "./util/cleanupWorkingDirectory";
import { createInitialGitCommit } from "./util/createInitialGitCommit";
import { createWorkingDirectoryCopy } from "./util/createWorkingDirectoryCopy";
import { installProjectPackages } from "./util/installProjectPackages";
import { isValidNodeVersion } from "./util/isValidNodeVersion";
import { replacePlaceholder } from "./util/replacePlaceholder";

const version = require("../package.json").version;
const name = require("../package.json").name;

interface ProjectConfiguration {
    projectName: string;
    verbose: boolean;
    noInstall: boolean;
}

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
        .option("-ni, --no-install", "Disables the installation of dependencies.")
        .action((projectName: string, options) => {
            if (isValidProjectName(projectName)) {
                createApp({ projectName, verbose: options.verbose, noInstall: !options.install });
            } else {
                console.log(kleur.bgRed("Please provide a valid project name."));
            }
        });
    program.parse();
})();

async function createApp(projectConfiguration: ProjectConfiguration) {
    console.log(kleur.white(`Creating a new Comet app in `) + kleur.yellow(`${process.cwd()}\n`));
    if (!createWorkingDirectoryCopy(projectConfiguration.projectName, projectConfiguration.verbose)) {
        return;
    }
    cleanupWorkingDirectory(projectConfiguration.verbose);
    replacePlaceholder(projectConfiguration.projectName, projectConfiguration.verbose);
    if (projectConfiguration.noInstall) {
        console.log(kleur.white(`Skipping installation of dependencies`));
    } else {
        const spinner = createSpinner("Installing dependencies").start();
        createInitialGitCommit();
        installProjectPackages(projectConfiguration.verbose);
        spinner.success({ text: "Installation successful" });
    }
    console.log(`\n${kleur.white(`Success! Created '${projectConfiguration.projectName}' at '${process.cwd()}'.`)}`);
    console.log(kleur.white(`Inside that directory, you can run several commands:\n`));
    console.log(kleur.white(`nvm use\n`));
    console.log(kleur.cyan(`npm run dev`));
    console.log(kleur.white(`Starts all services.\n`));
    console.log(kleur.cyan(`npx dev-pm status [--interval]`));
    console.log(kleur.white(`Checks the status of services.\n`));
    console.log(kleur.cyan(`npx dev-pm logs <service>`));
    console.log(kleur.white(`Shows the logs of a service.\n`));
    console.log(kleur.cyan(`npx dev-pm restart <service>`));
    console.log(kleur.white(`Restarts a service.\n`));
    console.log(kleur.cyan(`npx dev-pm shutdown`));
    console.log(kleur.white(`Shutdown all services.\n`));
    console.log(kleur.cyan(`npm run --prefix api fixtures`));
    console.log(kleur.white(`Imports fixtures.\n`));
    console.log(kleur.green(`\n☄️ Successfully created Comet app: ${projectConfiguration.projectName}`));
}
