export function isValidProjectName(value: string): boolean {
    const allowedFormat = /^[A-Za-z0-9][A-Za-z0-9-]*$/;
    return allowedFormat.test(value);
}
