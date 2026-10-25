"use client";

import { Activity, ArrowRight, HeartPulse, ShieldCheck, PieChart, Users, Zap, GraduationCap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]"></div>
            </div>

            <div className="main-container px-6 py-20 lg:px-14 lg:py-32">
                <motion.section 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid gap-16 lg:grid-cols-2 lg:items-center"
                >
                    <div className="space-y-10">
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-xs font-bold text-primary">
                            Clinical Intelligence Platform
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h1 className="text-6xl font-bold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl dark:text-white leading-[1.1]">
                                Predicting <br/>
                                <span className="text-primary">Maternal</span> <br/>
                                Outcomes.
                            </h1>
                            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                                A specialized clinical AI tool developed by pharmacy researchers to provide real-time delivery mode analytics.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
                            <Link 
                                href="/predict" 
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Launch Diagnostic
                                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                            <Link 
                                href="/about" 
                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-900 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                            >
                                Meet the Team
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">94.2%</p>
                                <p className="text-xs font-medium text-slate-500">Accuracy</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">Live</p>
                                <p className="text-xs font-medium text-slate-500">Analysis</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">Secure</p>
                                <p className="text-xs font-medium text-slate-500">Validated</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="relative lg:ml-10">
                        <div className="card-surface p-1 relative z-10 overflow-hidden bg-white dark:bg-slate-900 shadow-2xl">
                            <div className="p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Activity className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">System Monitor</h3>
                                            <p className="text-xs text-slate-500">Diagnostic Hub Active</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[10px] font-bold uppercase text-green-700">Online</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500">
                                        <span>Model Confidence</span>
                                        <span className="text-primary">89.4%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "89.4%" }}
                                            transition={{ duration: 1.5, delay: 1 }}
                                            className="h-full bg-primary"
                                        ></motion.div>
                                    </div>
                                </div>

                                <div className="grid gap-4 grid-cols-2">
                                    <div className="rounded-xl border border-slate-100 p-4 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-800">
                                        <Users className="h-4 w-4 text-primary mb-2" />
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Cases</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">234 History</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-100 p-4 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-800">
                                        <PieChart className="h-4 w-4 text-primary mb-2" />
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Model Version</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">v1.0 RF-ML</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative background elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
                    </motion.div>
                </motion.section>
                
                {/* Features Section */}
                <section className="mt-40 grid gap-8 sm:grid-cols-3">
                    {[
                        { icon: ShieldCheck, title: "Clinical Integrity", text: "Trained on certified datasets to ensure high reliability in every prediction." },
                        { icon: Activity, title: "Real-time Metrics", text: "Interactive analytics and visualizations for tracking model trends." },
                        { icon: HeartPulse, title: "Patient Centric", text: "Designed to assist clinicians in optimizing maternal delivery outcomes." }
                    ].map((feature, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -5 }}
                            className="group space-y-6 rounded-2xl border border-slate-100 bg-white p-8 transition-all hover:border-primary/20 dark:bg-slate-900 dark:border-slate-800"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900 group-hover:bg-primary group-hover:text-white transition-colors dark:bg-slate-800 dark:text-white">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{feature.text}</p>
                        </motion.div>
                    ))}
                </section>

                {/* Team Section */}
                <section className="mt-40 pt-20 border-t border-slate-100 dark:border-slate-800">
                    <motion.div 
                        whileHover={{ scale: 0.995 }}
                        className="card-surface p-12 bg-primary text-white border-none relative overflow-hidden group shadow-2xl shadow-primary/20"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                            <GraduationCap className="h-64 w-64 text-white" />
                        </div>
                        <div className="relative z-10 max-w-2xl space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs font-bold bg-white/10">
                                Pharmacy Student Project
                            </div>
                            <h2 className="text-5xl font-bold leading-tight">
                                Built for Clinical <br/>
                                <span className="text-white/80">Excellence.</span>
                            </h2>
                            <p className="text-lg text-white/80 font-medium leading-relaxed">
                                Developed by <span className="text-white font-bold">Azhar Nawaz</span> and team. Final year pharmacy students dedicated to maternal safety through technology.
                            </p>
                            <Link 
                                href="/about"
                                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-primary hover:bg-slate-50 transition-all shadow-xl"
                            >
                                Research Team Profile
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
