import { execSync } from "child_process";
import kleur from "kleur";
import process from "process";

export function createWorkingDirectoryCopy(projectName: string, verbose: boolean): boolean {
    const clone = `git clone --depth 1 git@github.com:vivid-planet/comet-starter.git ./${projectName}`;
    try {
        execSync(clone);
        process.chdir(`./${projectName}`);
        if (verbose) {
            console.log(kleur.white("Cloned git repository."));
        }
    } catch (e) {
        console.log(kleur.bgRed(`Error while cloning working directory to ${projectName}`));
        return false;
    }
    return true;
}
