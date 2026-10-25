"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, LayoutDashboard, FileText, LogIn, LogOut, UserPlus, Home, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem("ai_delivery_authenticated") === "true";
            setIsAuthenticated(auth);
        };
        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("ai_delivery_authenticated");
        setIsAuthenticated(false);
        router.push("/auth/login");
        window.dispatchEvent(new Event('storage'));
    };

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Predict", href: "/predict", icon: FileText },
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "About", href: "/about", icon: Users },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
            <div className="main-container flex h-16 items-center justify-between px-6 lg:px-14">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                        <Activity className="h-6 w-6" />
                    </div>
                    <div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Maternal<span className="text-primary">AI</span></span>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex lg:items-center lg:gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-900 ${
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden lg:block"></div>

                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-destructive/10 hover:text-destructive dark:bg-slate-900 dark:text-slate-400"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                                        pathname === "/auth/login"
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                                    }`}
                                >
                                    <LogIn className="h-4 w-4" />
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="hidden sm:flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
