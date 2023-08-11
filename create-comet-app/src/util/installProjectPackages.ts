import { exec } from "child_process";
import kleur from "kleur";

export async function installProjectPackages(): Promise<void> {
    const command = `./install.sh`;

    await new Promise<void>((resolve, reject) => {
        exec(command, (error) => {
            if (error) {
                console.log(kleur.yellow(`Error while installing project packages.`));
                console.log(kleur.yellow(`Try running "sh ./install.sh"`));
                reject();
            }
            resolve();
        });
    });
}
