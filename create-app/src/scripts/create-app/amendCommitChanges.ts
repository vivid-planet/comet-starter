import { execSync } from "child_process";

export function amendCommitChanges() {
    execSync("git add .");
    execSync("git commit --amend --no-edit");
}
