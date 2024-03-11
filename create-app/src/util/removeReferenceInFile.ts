import * as fs from "fs";
import kleur from "kleur";

export function removeReferenceInFile(filePath: string, regex: RegExp, verbose: boolean) {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const result = data.replace(regex, "");
        fs.writeFileSync(filePath, result, "utf8");
        if (verbose) {
            console.log(kleur.grey(`Info: Removed reference in ${filePath}`));
        }
    } catch (e) {
        console.log(kleur.yellow(`Warn: Could not remove reference in ${filePath}`));
        if (verbose) {
            console.log(kleur.grey(`Info: ${e}`));
        }
    }
}
