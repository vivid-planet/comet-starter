import Link from "next/link";

export default async function NotFound404() {
    return (
        <html>
            <body>
                <p>Page not found.</p>
                <Link href="/">Return Home</Link>
            </body>
        </html>
    );
}
