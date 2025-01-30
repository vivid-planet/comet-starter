export default async function RootNotFound() {
    // Only used for 404 returned by the middleware (e.g. SiteConfig not found)
    return (
        <html>
            <body />
        </html>
    );
}
