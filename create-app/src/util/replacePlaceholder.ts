import * as fs from "fs";
import { glob } from "glob";
import kleur from "kleur";

export function replacePlaceholder(projectName: string, verbose: boolean): void {
    const files: string[] = glob.sync([`./**`, `./.*`, `./.**/**`, `./**/.**/**`], {
        maxDepth: 5,
        ignore: `./.git/**`,
    });
    const placeholder = /[Ss]tarter/g;
    let changedFiles = 0;

    files.forEach((file) => {
        try {
            if (!fs.lstatSync(file).isFile()) {
                return;
            }
            const contents = fs.readFileSync(file, "utf8").toString();

            if (placeholder.test(contents)) {
                if (file.endsWith("intl-update.sh")) fs.writeFileSync(file, contents.replaceAll("lang/starter-lang", `lang/${projectName}-lang`));
                else fs.writeFileSync(file, contents.replaceAll(placeholder, projectName));
                changedFiles++;
                if (verbose) {
                    console.log(kleur.grey(`Replaced content in ${file}`));
                }
            }
        } catch (e) {
            console.log(kleur.yellow(`Could not replace placeholder in ${file}`));
            if (verbose) {
                console.log(kleur.grey(`${e}`));
            }
        }
    });
    if (verbose) {
        console.log(kleur.grey(`Successfully replaced content in ${changedFiles} files`));
    }
}
