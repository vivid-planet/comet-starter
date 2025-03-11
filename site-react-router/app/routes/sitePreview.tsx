import { verifySitePreviewJwt } from "@comet/cms-site";
import type { Route } from "./+types/sitePreview";
import { redirect, data } from "react-router";
import { SignJWT } from "jose";

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const jwt = params.get("jwt");
    if (!jwt) {
        throw data({ error: "JWT-Parameter is missing." }, { status: 400 });
    }

    const jwtData = await verifySitePreviewJwt(jwt);
    if (!jwtData) {
        throw data({ error: "JWT-validation failed." }, { status: 400 });
    }

    const cookieJwt = await new SignJWT({
        scope: jwtData.scope,
        path: jwtData.path,
        previewData: jwtData.previewData,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1 day")
        .sign(new TextEncoder().encode(process.env.SITE_PREVIEW_SECRET));

    return redirect(jwtData.path, {
        headers: {
            "Set-Cookie": `__comet_preview=${cookieJwt}; HttpOnly; SameSite=Lax`,
        }
    });
}