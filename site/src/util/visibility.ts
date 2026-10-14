export type VisibilityParam = "default" | "invisiblePages" | "invisibleBlocks";

const visibilityParams: VisibilityParam[] = ["default", "invisiblePages", "invisibleBlocks"];

export function isVisibilityParam(value: string): value is VisibilityParam {
    return (visibilityParams as string[]).includes(value);
}
