"use client";

import { BlockPreviewProvider, IFrameBridgeProvider } from "@dextinity/site-react";
import type { FunctionComponent } from "react";

export const withBlockPreview = (Component: FunctionComponent) => () => {
    return (
        <IFrameBridgeProvider>
            <BlockPreviewProvider>
                <Component />
            </BlockPreviewProvider>
        </IFrameBridgeProvider>
    );
};
