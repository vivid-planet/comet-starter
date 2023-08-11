import { exec } from "child_process";
import kleur from "kleur";
import process from "process";

export async function createWorkingDirectoryCopy(projectName: string, verbose: boolean): Promise<void> {
    const clone = `git clone --depth 1 git@gitlab.vivid-planet.com:comet/starter ./${projectName}`;

    await new Promise<void>((resolve, reject) => {
        exec(clone, (error, stdout, stderr) => {
            if (error) {
                console.log(kleur.red(stderr));
                reject();
            }
            if (stdout && verbose) {
                console.log(kleur.grey(stdout));
            }
            process.chdir(`./${projectName}`);
            resolve();
        });
    }).catch(() => {
        console.log(kleur.bgRed(`Error while cloning working directory to ${projectName}`));
        process.exit(1);
    });
}
