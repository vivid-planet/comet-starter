import clsx from "clsx";
import { ButtonHTMLAttributes, ComponentType } from "react";

import styles from "./Button.module.scss";

export type ButtonVariant = "contained" | "outlined" | "text";

type ButtonProps = {
    as?: ComponentType; // TODO infer additional props from provided as
    variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ as, variant, className, ...buttonProps }: ButtonProps) {
    const Root = as ?? "button";
    return (
        <Root
            className={clsx(
                styles.root,
                className,
                variant === "contained" && styles.contained,
                variant === "outlined" && styles.outlined,
                variant === "text" && styles.text,
            )}
            {...buttonProps}
        />
    );
}
