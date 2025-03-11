import { Router } from "express";
import { sitePreview } from "./sitePreview";

export const apiRouter = Router();

apiRouter.get("/site-preview", sitePreview);
