import * as fs from "fs";
import { glob } from "glob";
import kleur from "kleur";

export function replacePlaceholder(projectName: string, verbose: boolean): void {
    const files: string[] = glob.sync([`./**`, `./.*`, `./.**/**`, `./**/.**/**`], {
        maxDepth: 5,
        ignore: `./.git/**`,
    });
    const placeholder = /[comet-]?[Ss]tarter/g;
    let changedFiles = 0;

    files.forEach((file) => {
        try {
            if (!fs.lstatSync(file).isFile()) {
                return;
            }
            const contents = fs.readFileSync(file, "utf8").toString();

            if (placeholder.test(contents)) {
                if (verbose) {
                    console.log(kleur.grey(`Info: Replaced content in ${file}`));
                }
                fs.writeFileSync(file, contents.replaceAll(placeholder, projectName));
                changedFiles++;
            }
        } catch (e) {
            console.log(e);
            console.log(kleur.yellow(`Could not replace placeholder in ${file}`));
        }
    });
    if (verbose) {
        console.log(kleur.green(`Successfully replaced content in ${changedFiles} files`));
    }
}
