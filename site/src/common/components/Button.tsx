import stylex from "@stylexjs/stylex";
import { ButtonHTMLAttributes, ComponentType } from "react";

import { globalTokens } from "./../../tokens.stylex";

export type ButtonVariant = "contained" | "outlined" | "text";

type ButtonProps = {
    as?: ComponentType; // TODO infer additional props from provided as
    variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ as, variant, className, ...buttonProps }: ButtonProps) {
    const Root = as ?? "button";
    return (
        <Root
            {...stylex.props(
                styles.root,
                variant === "contained" && styles.contained,
                variant === "outlined" && styles.outlined,
                variant === "text" && styles.text,
            )}
            {...buttonProps}
        />
    );
}

const styles = stylex.create({
    root: {
        display: "inline-flex",
        padding: "8px 16px",
        borderRadius: 4,
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out",
        textAlign: "center",
        textDecoration: "none",
        fontFamily: globalTokens.fontFamily,
        fontSize: 16,
        fontWeight: 700,
        lineHeight: "110%",
        pointerEvents: {
            default: "auto",
            ":disabled": "none",
        },
    },
    contained: {
        backgroundColor: { default: globalTokens.primaryMain, ":hover": globalTokens.primaryDark, ":disabled": globalTokens.gray50 },
        color: { default: globalTokens.primaryContrastText, ":hover": globalTokens.primaryContrastText, ":disabled": globalTokens.gray400 },
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: { default: globalTokens.primaryMain, ":hover": globalTokens.primaryDark, ":disabled": globalTokens.gray200 },
    },
    outlined: {
        backgroundColor: "transparent",
        color: {
            default: globalTokens.primaryMain,
            ":hover": globalTokens.primaryDark,
            ":disabled": globalTokens.gray300,
        },
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: { default: globalTokens.primaryMain, ":hover": globalTokens.primaryDark, ":disabled": globalTokens.gray200 },
    },
    text: {
        backgroundColor: "transparent",
        color: { default: globalTokens.primaryMain, ":hover": globalTokens.primaryDark, ":disabled": globalTokens.gray300 },
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
    },
});
