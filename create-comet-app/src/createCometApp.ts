import { Command } from "commander";
import kleur from "kleur";
import { createSpinner } from "nanospinner";
import process from "process";

import { version } from "../package.json";
import { cleanupWorkingDirectory } from "./util/cleanupWorkingDirectory";
import { createInitialGitCommit } from "./util/createInitialGitCommit";
import { createWorkingDirectoryCopy } from "./util/createWorkingDirectoryCopy";
import { installProjectPackages } from "./util/installProjectPackages";
import { removeShowcaseContent } from "./util/removeShowcaseContent";
import { replacePlaceholder } from "./util/replacePlaceholder";
import { validateNodeVersion } from "./util/validateNodeVersion";

interface ProjectConfiguration {
    projectName: string;
    showcaseContent: boolean;
    verbose: boolean;
}

function isValidProjectName(value: string): boolean {
    const allowedFormat = /^[A-Za-z0-9][A-Za-z0-9-]*$/;
    return allowedFormat.test(value);
}

void (async () => {
    const program = new Command();
    if (!validateNodeVersion()) {
        console.log(kleur.bgRed("Invalid Node Version (your Node.js version is prior to v18)."));
        return;
    }

    program.name("create-comet-app").description("CLI to create a comet app").version(version);
    program
        .argument("<projectName>", "Sets the name of the project.")
        .option("--no-showcase", "Disables the addition of showcase content in the project.")
        .option("--showcase", " Adds showcase content to the project. (default)")
        .option("-v, --verbose", "Enables extra console logs for verbose output.")
        .action((projectName: string, showcaseContent: boolean, verbose: boolean) => {
            if (isValidProjectName(projectName)) {
                createCometApp({ projectName, showcaseContent, verbose });
            } else {
                console.log(kleur.bgRed("Please provide a valid project name."));
            }
        });
    program.parse();
})();

async function createCometApp(projectConfiguration: ProjectConfiguration) {
    console.log(kleur.white(`Creating a new Comet app in `) + kleur.yellow(`${process.cwd()}\n`));
    console.log(kleur.bold("Using npm.\n"));
    console.log(kleur.white(`Initializing project with${projectConfiguration.showcaseContent ? "" : "out"} showcase content\n`));
    await createWorkingDirectoryCopy(projectConfiguration.projectName, projectConfiguration.verbose);
    await cleanupWorkingDirectory(projectConfiguration.verbose);
    replacePlaceholder(projectConfiguration.projectName, projectConfiguration.verbose);
    const spinner = createSpinner("Installing dependencies").start();
    await installProjectPackages();
    if (!projectConfiguration.showcaseContent) {
        await removeShowcaseContent(projectConfiguration.verbose);
    }
    spinner.success({ text: "Installation successful" });
    await createInitialGitCommit();
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

    console.log(kleur.green("\n##########################################"));
    console.log(kleur.green("#                                        #"));
    console.log(kleur.green("#   ☄️ Successfully created Comet app     #"));
    console.log(kleur.green("#                                        #"));
    console.log(kleur.green("##########################################"));
}
