"use client";

import { usePreview } from "@comet/site-nextjs";
import { useGlobalScrollSpeed } from "@src/util/useGlobalScrollSpeed";
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
    offset = 200,
    delay = 0,
    fullHeight = false,
    onChange,
    ...props
}: FadeBoxInOnScrollProps) {
    const refScrollContainer = useRef<HTMLDivElement | null>(null);
    const [fadeIn, setFadeIn] = useState<boolean>(false);
    const { previewType } = usePreview();
    const windowSize = useWindowSize();
    const scrollSpeed = useGlobalScrollSpeed();

    // Dynamic delay and fade duration for speedup fade in on faster scrolling
    const dynamicDelay = scrollSpeed > 1 ? delay / (scrollSpeed / 2) : delay;
    const dynamicFadeDuration = scrollSpeed > 1 ? Math.min(500 / (scrollSpeed / 2), 200) : 500;

    useEffect(() => {
        const scrollContainer = refScrollContainer.current;
        if (!scrollContainer || previewType === "BlockPreview") return;

        // Dynamic offset for trigger fade in earlier on faster scrolling
        const dynamicOffsetScrollSpeed = scrollSpeed > 1 ? scrollSpeed * 100 : 0;
        // Dynamic offset page height for adjusting offset relative to page height
        const dynamicOffsetPageHeight = windowSize ? (windowSize?.height / 2.5) * -1 + offset : offset;
        const fadeInOffset = dynamicOffsetScrollSpeed + dynamicOffsetPageHeight;

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
                rootMargin: `0px 0px ${direction === "bottom" ? fadeInOffset + 40 : direction === "top" ? fadeInOffset - 40 : fadeInOffset}px 0px`,
                threshold: 0,
            },
        );

        observer.observe(scrollContainer);

        return () => {
            if (scrollContainer) {
                observer.unobserve(scrollContainer);
            }
        };
    }, [offset, threshold, previewType, direction, windowSize, onChange, scrollSpeed]);

    // Set CSS variable for delay and duration
    const style = { "--fade-delay": `${dynamicDelay ?? 0}ms`, "--fade-duration": `${dynamicFadeDuration ?? 0}ms` } as React.CSSProperties;

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
