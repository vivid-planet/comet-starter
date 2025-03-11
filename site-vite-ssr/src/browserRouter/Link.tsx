import { PropsWithChildren, use, useCallback } from "react";
import { RouterContext } from "./RouterProvider";

type Props = {
    to: string;
    className?: string;
};
export function Link({ to, ...props }: PropsWithChildren<Props>) {
    const router = use(RouterContext);
    const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (!router) throw new Error("Router context not found");
        router.push(to);
    }, [to]);
    return <a href={to} onClick={handleClick} {...props}>{props.children}</a>;
}
