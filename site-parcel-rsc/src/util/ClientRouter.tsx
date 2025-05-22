"use client"
import { createContext, useContext } from 'react';
import { PredefinedPage } from './predefinedPages';

type ClientRouterConfig = {
    initialUrl: string;
    predefinedPages: PredefinedPage[]; // contains only current domain + current language pages, linking to others is not possible
}

const InitialUrlContext = createContext<ClientRouterConfig | undefined>(undefined);

export function ClientRouterProvider({ children, value }: { children: React.ReactNode, value: ClientRouterConfig }) {
    return (
      <InitialUrlContext.Provider value={value}>
        {children}
      </InitialUrlContext.Provider>
    );
}

export function useClientRouter() {
    const config = useContext(InitialUrlContext);
    if (!config) {
        throw new Error("ClientRouterProvider not found");
    }
    return config;
}

export function createPredefinedPagePath(predefinedPages: PredefinedPage[], type: string) {
    const page = predefinedPages.find(p => p.type === type);
    if (!page) {
        throw new Error(`Predefined page not found: ${type}`);
    }
    return page.path;
}

export function usePredefinedPagePath(type: string) {
    const { predefinedPages } = useClientRouter();
    return createPredefinedPagePath(predefinedPages, type);
}
