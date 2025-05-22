import { ComponentType } from "react";
import { NewsDetailPage } from "./[slug]/NewsDetailPage";
import { NewsIndexPage } from "./NewsIndexPage";
import { renderRequest } from "@src/util/rsc";
import { Request, Response } from "express";

type Route = {
    pattern: string;
    handler(req: Request, res: Response, params: any): Promise<void>; // TODO improve type for params
}

export const routes: Route[] = [
{
    pattern: '/',
    handler: (req: Request, res: Response) => renderRequest(req, res, 
    <NewsIndexPage 
        scope={{ domain: res.locals.siteConfig.scope.domain, language: req.params.language}} 
        siteConfig={res.locals.siteConfig} 
    />, {
        component: NewsIndexPage as ComponentType
    })
},
{
    pattern: '/:slug',
    handler: (req: Request, res: Response, params: { slug: string }) => renderRequest(req, res,
    <NewsDetailPage 
        slug={params.slug}
        scope={{ domain: res.locals.siteConfig.scope.domain, language: req.params.language}}
        siteConfig={res.locals.siteConfig}
    />, {
        component: NewsDetailPage as ComponentType
    })
}
];