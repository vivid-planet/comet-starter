function isNodeVersionGreaterThan18(): boolean {
    const [major] = process.versions.node.split(".").map(Number);
    return major >= 18;
}

export function isValidNodeVersion() {
    return isNodeVersionGreaterThan18();
}
