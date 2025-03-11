import { ReactNode, use, useCallback } from "react";
import { RouterContext } from "./RouterProvider";
import { GQLPageTreeNodeScope } from "@src/graphql.generated";

type LinkProps = {
    scope: Pick<GQLPageTreeNodeScope, "language">,
} & RouterLinkProps;
export function Link({ scope, path, ...props }: LinkProps) {
    if (!path.startsWith("/")) {
        throw new Error("Path must start with a `/`.");
    }
    return <RouterLink path={`/${scope.language}${path}`} {...props} />;
}

type PredefinedPageLinkProps = {
    type: string;
    scope: Pick<GQLPageTreeNodeScope, "language">;
} & RouterLinkProps;
export function PredefinedPageLink({ scope, path, ...props }: PredefinedPageLinkProps) {
    if (path != "" && !path.startsWith("/")) {
        throw new Error("Path must start with a `/`.");
    }
    const router = use(RouterContext);
    const predefinedPage = router?.routeData.predefinedPages.find((page: any) => {
        return page.type === props.type && page.language === scope.language;
    });
    if (!predefinedPage) throw new Error(`Predefined page not found for type ${props.type}`);
    path = predefinedPage.path + path;
    return <RouterLink path={path} {...props} />;
}


type RouterLinkProps = {
    path: string;
    className?: string;
    children?: ReactNode;
};
function RouterLink({ path, ...props }: RouterLinkProps) {
    if (!path.startsWith("/")) {
        throw new Error("Path must start with a `/`.");
    }

    const router = use(RouterContext);
    const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (!router) throw new Error("Router context not found");
        router.push(path);
    }, [path]);
    return <a href={path} onClick={handleClick} {...props}>{props.children}</a>;
}
