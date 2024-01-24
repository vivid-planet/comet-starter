import * as fs from "fs";

const readmePath = "README.md";

export function cleanupReadme() {
    const originalReadme = fs.readFileSync(readmePath, "utf8").toString();
    const linesOfOriginalReadme = originalReadme.split("\n");

    let includeInProjectReadme = false;
    const linesOfProjectReadme: string[] = [];
    for (let i = 0; i < linesOfOriginalReadme.length; i++) {
        const line = linesOfOriginalReadme[i];

        if (!includeInProjectReadme && line.startsWith("<!-- PROJECT_README_BEGIN")) {
            includeInProjectReadme = true;
            i++; // blank line after comment due to prettier formatting
            continue;
        }

        if (includeInProjectReadme) {
            linesOfProjectReadme.push(line);
        }
    }

    fs.writeFileSync(readmePath, linesOfProjectReadme.join("\n"), "utf8");
}
