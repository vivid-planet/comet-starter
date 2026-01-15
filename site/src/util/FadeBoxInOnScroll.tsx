"use client";

import { usePreview } from "@comet/site-nextjs";
import { useWindowSize } from "@src/util/useWindowSize";
import clsx from "clsx";
import { type ReactElement, useEffect, useRef, useState } from "react";

import styles from "./FadeBoxInOnScroll.module.scss";

interface FadeBoxInOnScrollProps {
    direction?: "top" | "right" | "bottom" | "left" | undefined;
    children: ReactElement;
    threshold?: number;
    offset?: number;
    delay?: number;
    fullHeight?: boolean;
    onChange?: (inView: boolean) => void;
}

export function FadeBoxInOnScroll({
    children,
    direction = undefined,
    threshold = 1,
    offset = 0,
    delay = 0,
    fullHeight = false,
    onChange,
    ...props
}: FadeBoxInOnScrollProps) {
    const refScrollContainer = useRef<HTMLDivElement | null>(null);
    const [fadeIn, setFadeIn] = useState<boolean>(false);
    const { previewType } = usePreview();
    const windowSize = useWindowSize();

    useEffect(() => {
        const scrollContainer = refScrollContainer.current;
        if (!scrollContainer || previewType === "BlockPreview") return;

        const fadeInOffset = windowSize ? (windowSize?.height / 2.5) * -1 + offset : offset;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setFadeIn(true);
                        if (onChange) {
                            onChange(entry.isIntersecting);
                        }
                    }
                });
            },
            {
                rootMargin: `0px 0px ${direction === "bottom" ? fadeInOffset + 50 : direction === "top" ? fadeInOffset - 50 : fadeInOffset}px 0px`,
            },
        );

        observer.observe(scrollContainer);

        return () => {
            if (scrollContainer) {
                observer.unobserve(scrollContainer);
            }
        };
    }, [offset, threshold, previewType, direction, windowSize, onChange]);

    // Set CSS variable for delay
    const style = { "--fade-delay": `${delay ?? 0}ms` } as React.CSSProperties;

    return (
        <div className={styles.overflowContainer}>
            <div
                ref={refScrollContainer}
                className={clsx(
                    styles.scrollContainer,
                    fullHeight && styles.fullHeight,
                    direction === "left" && styles.fromLeft,
                    direction === "right" && styles.fromRight,
                    direction === "top" && styles.fromTop,
                    direction === "bottom" && styles.fromBottom,
                    (previewType === "BlockPreview" || fadeIn) && styles.fadeIn,
                )}
                style={style}
                {...props}
            >
                {children}
            </div>
        </div>
    );
}
