import { verifySitePreviewJwt, type SitePreviewParams } from "@comet/cms-site";
import { Request } from "express";

export async function previewParams(request: Request): Promise<SitePreviewParams | null> {
    const cookie = request.cookies?.__comet_preview;
    if (cookie) {
        return verifySitePreviewJwt(cookie);
    }
    return null;
}
