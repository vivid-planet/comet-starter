import { execSync } from "child_process";
import kleur from "kleur";

export function createInitialGitCommit() {
    try {
        execSync("git init");
        execSync("git add .");
        const basedOnCommit = execSync('git ls-remote git@github.com:vivid-planet/comet-starter.git | head -1 | sed "s/HEAD//"');
        execSync("git checkout -b setup-project");
        execSync(`git commit -m "Initial commit from Starter" -m "Based on ${basedOnCommit}"`);
        console.log(kleur.white("Created git commit."));
    } catch (e) {
        console.log(kleur.yellow("Could not create git commit."));
    }
}
