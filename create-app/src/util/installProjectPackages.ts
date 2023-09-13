import { execSync } from "child_process";
import kleur from "kleur";

export function installProjectPackages() {
    try {
        execSync("./install.sh");
    } catch (e) {
        console.log(kleur.yellow(`Error while installing project packages.`));
        console.log(kleur.yellow(`Try running "sh ./install.sh"`));
    }
}
