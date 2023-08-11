function isNodeVersionGreaterThan18(): boolean {
    const [major, minor] = process.versions.node.split(".").map(Number);
    return major > 18 || (major === 18 && minor >= 0);
}

export function validateNodeVersion() {
    return isNodeVersionGreaterThan18();
}
