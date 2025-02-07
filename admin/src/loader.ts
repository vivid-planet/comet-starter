import { createElement } from "react";
import { render } from "react-dom";

import { App } from "./App";

const loadHtml = () => {
    const rootElement = document.querySelector<HTMLElement>("#root");
    if (!rootElement) {
        throw new Error("Comet: root element not found in html - can not render Application");
    }

    render(createElement(App), rootElement);
};

if (["interactive", "complete"].includes(document.readyState)) {
    loadHtml();
} else {
    document.addEventListener("DOMContentLoaded", loadHtml, false);
}
