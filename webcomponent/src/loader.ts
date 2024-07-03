/* eslint-disable no-console */

import { render } from "./render";

let shadowRoot: ShadowRoot | null = null;

const attributes = [];

class CometWebcomponent extends HTMLElement {
    protected static get observedAttributes(): string[] {
        return attributes;
    }

    /** gets called when an attribute changes **/
    protected attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown): void {
        if (oldValue !== newValue) {
            this.renderApp();
        }
    }

    /** gets called when the element is added to the DOM **/
    protected connectedCallback(): void {
        this.renderApp();
    }

    private checkRequiredAttributes(): boolean {
        const errorMessages: string[] = [];

        for (const attribute of attributes) {
            if (!this.hasAttribute(attribute)) {
                console.warn(`comet-webcomponent '${attribute}' attribute`);
                errorMessages.push(`missing '${attribute}' attribute`);
            }
        }

        return errorMessages.length === 0;
    }

    protected renderApp(): void {
        // if (!this.checkRequiredAttributes()) return;

        shadowRoot = this.shadowRoot;
        if (!shadowRoot) {
            shadowRoot = this.attachShadow({ mode: "open" });
            Object.defineProperty(this, "ownerDocument", { value: this.shadowRoot });
        }

        // create a root element for the shadow dom, which acts as a container for the app
        const appSlot = document.createElement("div");
        appSlot.setAttribute("id", "app root");
        shadowRoot.appendChild(appSlot);

        // create a slot for the styles
        const styleSlot = document.createElement("section");
        styleSlot.setAttribute("id", "style slot");
        shadowRoot.appendChild(styleSlot);

        // handle attributes

        render(appSlot, styleSlot);
    }
}
if (!window.customElements.get("comet-webcomponent")) {
    window.customElements.define("comet-webcomponent", CometWebcomponent);
}
