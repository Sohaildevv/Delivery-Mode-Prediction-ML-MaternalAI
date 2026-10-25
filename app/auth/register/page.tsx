"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);
    const router = useRouter();

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage({ text: "Passwords do not match.", type: 'error' });
            return;
        }

        localStorage.setItem(
            "ai_delivery_user",
            JSON.stringify({ email, password }),
        );
        localStorage.setItem("ai_delivery_authenticated", "true");
        setMessage({ text: "Registration successful! Welcome to MaternalAI.", type: 'success' });
        setTimeout(() => router.push("/dashboard"), 1000);
    };

    return (
        <main className="relative min-h-screen flex items-center justify-center px-6 py-16 lg:px-14">
            {/* Background blur */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-md space-y-8">
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="card-surface p-8 space-y-8 shadow-2xl">
                    <div className="text-center space-y-2">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/30">
                            <UserPlus className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h1>
                        <p className="text-slate-500">Join the healthcare AI network</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    placeholder="doctor@hospital.com"
                                    className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:border-slate-800 dark:bg-slate-950"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:border-slate-800 dark:bg-slate-950"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:border-slate-800 dark:bg-slate-950"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`rounded-xl p-4 text-sm font-medium ${
                                message.type === 'success' 
                                    ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                                    : 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <button className="w-full rounded-2xl bg-primary-600 py-4 font-bold text-white transition hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30">
                            Register Now
                        </button>

                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="font-bold text-primary-600 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}
