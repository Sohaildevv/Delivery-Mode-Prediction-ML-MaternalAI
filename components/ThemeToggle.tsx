"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const stored = window.localStorage.getItem("theme");
        const initial = stored === "dark" ? "dark" : "light";
        setTheme(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        window.localStorage.setItem("theme", nextTheme);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}
