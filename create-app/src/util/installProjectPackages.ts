import { execSync } from "child_process";
import kleur from "kleur";

export function installProjectPackages(verbose: boolean): void {
    try {
        const stdout = execSync("./install.sh");
        if (verbose) console.log(kleur.white(stdout.toString()));
    } catch (e) {
        console.log(kleur.yellow(`Error while installing project packages.`));
        console.log(kleur.yellow(`Try running "sh ./install.sh"`));
    }
}
