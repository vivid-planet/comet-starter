import { notFound } from "next/navigation";

export default function AssetsLayout() {
    // Do not present a dedicated 404 page, just send the notfound-header without content
    notFound();
}
