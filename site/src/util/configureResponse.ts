import { NextResponse } from "next/server";

export function configureResponse(response: NextResponse) {
    response.headers.set(
        "Content-Security-Policy1",
        `
            default-src 'self';
            form-action 'self'; 
            object-src 'none';
            img-src 'self' https: data:${process.env.NODE_ENV === "development" ? " http:" : ""};
            media-src 'self' https: data:${process.env.NODE_ENV === "development" ? " http:" : ""};
            style-src 'self' 'unsafe-inline'; 
            font-src 'self' https: data:;
            script-src 'self' 'unsafe-inline' https:${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""};
            connect-src 'self' https:${process.env.NODE_ENV === "development" ? " http:" : ""};
            frame-ancestors ${process.env.ADMIN_URL ?? "none"};
            upgrade-insecure-requests; 
            block-all-mixed-content;
            frame-src 'self' https://*.youtube.com https://*.youtube-nocookie.com;
        `
            .replace(/\s{2,}/g, " ")
            .trim(),
    );
    if (process.env.ADMIN_URL) {
        response.headers.set("Access-Control-Allow-Origin", process.env.ADMIN_URL);
    }
    return response;
}
