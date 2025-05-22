import { type SitePreviewParams } from "@comet/cms-site";
import { AsyncLocalStorage } from "async_hooks";

export const sitePreviewParamsStorage = new AsyncLocalStorage<SitePreviewParams>();
