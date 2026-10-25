import ThemeToggle from "@/components/ThemeToggle";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI Delivery Mode Prediction System",
    description: "Predict normal delivery or C-section using machine learning and healthcare analytics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased selection:bg-primary/20 selection:text-primary">
                <AuthGuard>
                    <div className="min-h-screen">
                        <Navbar />
                        <div className="fixed right-6 top-6 z-[60]">
                            <ThemeToggle />
                        </div>
                        {children}
                    </div>
                </AuthGuard>
            </body>
        </html>
    );
}
