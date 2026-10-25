"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const isAuthenticated = localStorage.getItem("ai_delivery_authenticated") === "true";
            const isAuthPage = pathname.startsWith("/auth");
            const isHomePage = pathname === "/";
            const isAboutPage = pathname === "/about";

            if (!isAuthenticated && !isAuthPage && !isHomePage && !isAboutPage) {
                router.push("/auth/login");
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    if (isLoading && !pathname.startsWith("/auth") && pathname !== "/" && pathname !== "/about") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground font-medium animate-pulse">Verifying credentials...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
