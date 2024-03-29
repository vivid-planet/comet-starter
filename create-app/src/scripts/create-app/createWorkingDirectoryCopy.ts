import { execSync } from "child_process";
import kleur from "kleur";
import process from "process";

export function createWorkingDirectoryCopy(projectName: string, verbose: boolean): void {
    try {
        const clone = `git clone --depth 1 https://github.com/vivid-planet/comet-starter.git ./${projectName}`;
        execSync(clone);
        process.chdir(`./${projectName}`);
        if (verbose) {
            console.log(kleur.grey("Cloned git repository."));
        }
    } catch (e) {
        console.log(kleur.red("Could not clone git repository."));
        if (verbose) {
            console.log(kleur.grey(`${e}`));
        }
        process.exit(1);
    }
}
