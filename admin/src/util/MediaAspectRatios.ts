import * as React from "react";

type MediaAspectRatios = "16x9" | "4x3" | "3x2" | "3x1" | "2x1" | "1x1" | "1x2" | "1x3" | "2x3" | "3x4" | "9x16";

export const mediaAspectRatioOptions: Array<{
    value: MediaAspectRatios;
    label: React.ReactNode;
}> = [
    { label: "16:9", value: "16x9" },
    { label: "4:3", value: "4x3" },
    { label: "3:2", value: "3x2" },
    { label: "3:1", value: "3x1" },
    { label: "2:1", value: "2x1" },
    { label: "1:1", value: "1x1" },
    { label: "1:2", value: "1x2" },
    { label: "1:3", value: "1x3" },
    { label: "2:3", value: "2x3" },
    { label: "3:4", value: "3x4" },
    { label: "9:16", value: "9x16" },
];
