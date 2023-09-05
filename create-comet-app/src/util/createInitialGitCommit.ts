import { exec } from "child_process";
import kleur from "kleur";

export async function createInitialGitCommit() {
    await exec("git init", (error, stdout) => {
        if (error) {
            console.log(kleur.bgRed(`Error while initializing git.`));
            return;
        }
        console.log(stdout);

        exec("git add .", (error, stdout, stderr) => {
            if (error) {
                console.log(kleur.bgRed(`Error while adding files.`));
                console.log(stderr);
                return;
            }
        });
    });

    await exec('git ls-remote git@github.com:vivid-planet/comet-starter.git | head -1 | sed "s/HEAD//"', (error, stdout, stderr) => {
        if (error) {
            console.log(kleur.bgRed(`Error while making initial commit.`));
            console.log(kleur.red(stderr));
            return;
        }
        exec("git checkout -b setup-project", (error, stdout, stderr) => {
            if (error) {
                console.log(kleur.bgRed(`Error while making new git branch.`));
                console.log(stderr);
                return;
            }
        });
        exec(`git commit -m "Initial commit from Starter" -m "Based on ${stdout}"`, (error) => {
            if (error) {
                console.log(kleur.bgRed(`Error while making initial commit.`));
            }
        });
    });

    console.log(kleur.white("Created git commit."));
}
