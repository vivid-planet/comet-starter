import { getSiteConfigForRequest } from "@app/util/siteConfig";
import type { Route } from "./+types/index";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    return redirect(`/`+siteConfig.scope.languages[0]);
}
