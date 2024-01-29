import { execSync } from "child_process";
import kleur from "kleur";
import process from "process";

export function createWorkingDirectoryCopy(projectName: string, verbose: boolean): void {
    const clone = `git clone --depth 1 https://github.com/vivid-planet/comet-starter.git ./${projectName}`;
    execSync(clone);
    process.chdir(`./${projectName}`);
    if (verbose) {
        console.log(kleur.white("Cloned git repository."));
    }
}
