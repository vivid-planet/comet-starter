function isNodeVersionGreaterThan22(): boolean {
    const [major] = process.versions.node.split(".").map(Number);
    return major >= 22;
}

export function isValidNodeVersion() {
    return isNodeVersionGreaterThan22();
}
