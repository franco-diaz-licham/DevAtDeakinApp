import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useBootstrapTheme() {

    /** Load prefered theme. */
    const getInitial = (): Theme => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
        const prefers = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        return prefers ? "dark" : "light";
    };

    const [theme, setTheme] = useState<Theme>(getInitial);

    // Persist + reflect on DOM whenever theme changes
    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Keep hook in sync if user mutates <html data-bs-theme>
    useEffect(() => {
        const el = document.documentElement;
        const obs = new MutationObserver(() => {
            const t = (el.getAttribute("data-bs-theme") as Theme) || "light";
            if (t !== theme) {
                setTheme(t);
                localStorage.setItem("theme", t);
            }
        });
        obs.observe(el, { attributes: true, attributeFilter: ["data-bs-theme"] });
        return () => obs.disconnect();
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return { theme, setTheme, toggle };
}
