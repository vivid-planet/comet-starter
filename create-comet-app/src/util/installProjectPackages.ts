import { execSync } from "child_process";
import kleur from "kleur";

export function installProjectPackages() {
    const command = `./install.sh`;
    try {
        execSync(command);
    } catch (e) {
        console.log(kleur.yellow(`Error while installing project packages.`));
        console.log(kleur.yellow(`Try running "sh ./install.sh"`));
    }
}
