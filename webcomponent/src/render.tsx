import React from "react";
import { createRoot, Root } from "react-dom/client";

import { App } from "./App";

let root: Root;

export const render = (appSlot: HTMLElement, styleSlot: HTMLElement) => {
    if (!root) {
        root = createRoot(appSlot);
        // load styles
    } else {
        // unmount and remount to reset styles and root
        root.unmount();
        root = createRoot(appSlot);
    }

    root.render(<App styleSlot={styleSlot} />);
};
