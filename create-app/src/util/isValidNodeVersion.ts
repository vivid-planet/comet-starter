function isNodeVersionGreaterThan20(): boolean {
    const [major] = process.versions.node.split(".").map(Number);
    return major >= 20;
}

export function isValidNodeVersion() {
    return isNodeVersionGreaterThan20();
}
