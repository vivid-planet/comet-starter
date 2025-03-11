import { verifySitePreviewJwt } from "@comet/cms-site";
import { SignJWT } from "jose";
import { Request, Response } from "express";

export async function sitePreview(req: Request, res: Response) {
    const jwt = req.query.jwt;
    if (!jwt || typeof jwt !== "string") {
        res.status(400).send("JWT-Parameter is missing or invalid.");
        return;
    }

    const jwtData = await verifySitePreviewJwt(jwt);
    if (!jwtData) {
        res.status(400).send("JWT-validation failed.");
        return;
    }

    const cookieJwt = await new SignJWT({
        scope: jwtData.scope,
        path: jwtData.path,
        previewData: jwtData.previewData,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1 day")
        .sign(new TextEncoder().encode(process.env.SITE_PREVIEW_SECRET));

    return res.header("Set-Cookie", `__comet_preview=${cookieJwt}; HttpOnly; SameSite=Lax`,).redirect(jwtData.path);
}