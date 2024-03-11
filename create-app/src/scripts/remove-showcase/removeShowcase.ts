import { existsSync, readFileSync, writeFileSync } from "fs";
import kleur from "kleur";

import { deleteFilesAndFolders } from "../../util/deleteFilesAndFolders";
import { runEslintFix } from "../../util/runEslintFix";

async function removeFileContent(verbose: boolean) {
    const contentToRemove: Array<{
        file: string;
        replacements: Array<string | RegExp>;
    }> = [
        {
            file: `./admin/src/Routes.tsx`,
            replacements: [/\s*<.*?products.*?>/g],
        },
        {
            file: `./admin/src/common/MasterMenu.tsx`,
            replacements: [/\s*<MenuCollapsibleItem.*products`}\s*\/>\s*<\/MenuCollapsibleItem>/gs],
        },
        {
            file: `./api/src/app.module.ts`,
            replacements: [/\s*ProductsModule,/gs],
        },
        {
            file: `./api/src/db/fixtures/fixtures.console.ts`,
            replacements: [/, @InjectRepository.*Product.*<Product>/gs, /\s*await Promise.all\(\[generateProducts.*]\);/gs],
        },
        {
            file: `./api/src/db/fixtures/fixtures.module.ts`,
            replacements: ["MikroOrmModule.forFeature([Product]), "],
        },
    ];
    for (const content of contentToRemove) {
        if (!existsSync(content.file)) {
            console.log(kleur.yellow(`Warn: File ${content.file} does not exist!`));
            console.log(kleur.yellow(`Warn: Skipping: ${content.file}...`));
            continue;
        }
        let fileContent = readFileSync(content.file, "utf-8").toString();
        for (const replacement of content.replacements) {
            fileContent = fileContent.replaceAll(replacement, "");
        }
        try {
            writeFileSync(content.file, fileContent);
        } catch (e) {
            writeFileSync(content.file, fileContent);
            console.log(kleur.yellow(`Warn: Could not lint: ${content.file}!`));
            if (verbose) console.log(kleur.grey(`Info: ${e}`));
        }
    }
}

export async function removeShowcaseContent(verbose: boolean) {
    await removeFileContent(verbose);
    const filesToRemove: string[] = [
        "api/src/products",
        "admin/src/products",
        "api/src/db/fixtures/generators/product.fixture.ts",
        "api/src/db/migrations/Migration20220721123033.ts",
    ];
    deleteFilesAndFolders(filesToRemove, verbose);
    runEslintFix(verbose);
}
