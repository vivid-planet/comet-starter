import * as fs from "fs";
import kleur from "kleur";

const readmePath = "README.md";

export function cleanupReadme(verbose: boolean) {
    try {
        const originalReadme = fs.readFileSync(readmePath, "utf8").toString();
        const newReadme = originalReadme.replace(/.+<!-- PROJECT_README_BEGIN.+-->\n\n/s, "");
        fs.writeFileSync(readmePath, newReadme, "utf8");
        if (verbose) {
            console.log(kleur.grey("Info: Cleaned up README.md"));
        }
    } catch (e) {
        console.log(kleur.yellow("Warn: Could not clean up README.md"));
        if (verbose) {
            console.log(kleur.grey(`Info: ${e}`));
        }
    }
}
