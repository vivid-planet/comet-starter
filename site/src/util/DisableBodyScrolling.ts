import { useEffect } from "react";

import styles from "./DisableBodyScrolling.module.css";

export function DisableBodyScrolling() {
    useEffect(() => {
        document.documentElement.classList.add(styles.noScroll);
        return () => {
            document.documentElement.classList.remove(styles.noScroll);
        };
    }, []);

    return null;
}
