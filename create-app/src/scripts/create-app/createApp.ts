import kleur from "kleur";
import process from "process";

import { replacePlaceholder } from "../../util/replacePlaceholder";
import { cleanupWorkingDirectory } from "./cleanupWorkingDirectory";
import { createInitialGitCommit } from "./createInitialGitCommit";
import { createWorkingDirectoryCopy } from "./createWorkingDirectoryCopy";

interface ProjectConfiguration {
    projectName: string;
    verbose: boolean;
}

export async function createApp(projectConfiguration: ProjectConfiguration) {
    console.log(kleur.white(`Creating a new Comet app in `) + kleur.yellow(`${process.cwd()}\n`));
    createWorkingDirectoryCopy(projectConfiguration.projectName, projectConfiguration.verbose);
    cleanupWorkingDirectory(projectConfiguration.verbose);
    replacePlaceholder(projectConfiguration.projectName, projectConfiguration.verbose);
    createInitialGitCommit();
    console.log(`\n${kleur.white(`Success! Created '${projectConfiguration.projectName}' at '${process.cwd()}'.`)}`);
    console.log(kleur.white(`Inside that directory, you can run several commands:\n`));
    console.log(kleur.white(`nvm use\n`));
    console.log(kleur.cyan(`sh ./install.sh\n`));
    console.log(kleur.white(`Installs dependencies.\n`));
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
