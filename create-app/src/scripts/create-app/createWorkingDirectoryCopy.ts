import { execSync } from "child_process";
import { program } from "commander";
import kleur from "kleur";
import process from "process";

export function createWorkingDirectoryCopy(projectName: string, verbose: boolean): void {
    const clone = `git clone --depth 1 https://github.com/vivid-planet/comet-starter.git ./${projectName}`;
    try {
        execSync(clone);
        process.chdir(`./${projectName}`);
        if (verbose) {
            console.log(kleur.white("Cloned git repository."));
        }
    } catch (e) {
        program.error(`Error while cloning working directory to ${projectName}`);
    }
}
