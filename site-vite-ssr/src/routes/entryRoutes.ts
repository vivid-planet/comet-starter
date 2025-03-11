import { Request, type Response as ExpressResponse } from 'express';
import { fetchPredefinedPages } from './util/predefinedPages';
import { predefinedPageRoutes } from "@src/documents/predefinedPages";
import { ComponentType } from "react";
import { Page as PageTreePage, pageTreePageLoader } from './page';
import { BlockPreview, loader as blockPreviewLoader } from './block-preview';
import { serverOnly$ } from 'vite-env-only/macros';


export type EntryRoute<T> = {
    path: string,
    loader?: (request: Request, response: ExpressResponse) => Promise<T>,
    component?: ComponentType<{ loaderData: T }>,
    language?: string;
};
export type EntryRoutes = EntryRoute<any>[];

export function buildEntryRoutes(predefinedPages: Awaited<ReturnType<typeof fetchPredefinedPages>>): EntryRoutes {
    return [
        {
            path: "/block-preview/:domain/:language/:type",
            component: BlockPreview,
            loader: blockPreviewLoader
        },
        ...predefinedPages.map((page) => {
            return predefinedPageRoutes[page.type].map((route) => {
                return {
                    path: page.path + route.path,
                    loader: route.loader,
                    component: route.component,
                    language: page.language
                }
            });
        }).flat(),
        {
            path: "/:language/*splat",
            component: PageTreePage,
            loader: pageTreePageLoader
        },
        {
            path: "/",
            loader: serverOnly$(() => {
                throw new Response(null, { status: 302, headers: { Location: "/en" } });
            })
        }
    ];
}
