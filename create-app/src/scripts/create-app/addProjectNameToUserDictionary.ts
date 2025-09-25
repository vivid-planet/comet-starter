import { existsSync, readFileSync, writeFileSync } from "fs";

const userDictionary = ".cspellignore";

export function addProjectNameToUserDictionary(projectName: string) {
    if (!existsSync(userDictionary)) {
        return;
    }

    let fileContent = readFileSync(userDictionary, "utf8");
    fileContent += `${projectName.split("-").join("\n")}\n`;

    writeFileSync(userDictionary, fileContent);
}
