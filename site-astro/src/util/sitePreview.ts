import { verifySitePreviewJwt, type SitePreviewParams } from "@comet/cms-site";
import { parse } from "cookie";

export async function previewParams(request: Request): Promise<SitePreviewParams | null> {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) return null;

    const cookies = parse(cookieHeader);
    const cookie = cookies.__comet_preview;
    if (cookie) {
        return verifySitePreviewJwt(cookie);
    }
    return null;
}
