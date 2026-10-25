"use client";

import { ArrowLeft, Users, GraduationCap, Award, Heart, BookOpen, ChevronRight, Github, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-background">
            {/* Industrial Grid Background */}
            <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="main-container px-6 py-20 lg:px-14 max-w-5xl mx-auto">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-16"
                >
                    <motion.div variants={itemVariants}>
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Command Home
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-8 text-center sm:text-left">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-2xl shadow-primary/30 mx-auto sm:mx-0">
                            <Users className="h-10 w-10" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-6xl font-black tracking-tighter text-foreground sm:text-8xl uppercase leading-none">
                                Research <br/>
                                <span className="text-primary italic opacity-90">Collective.</span>
                            </h1>
                            <p className="max-w-2xl text-xl font-medium leading-relaxed text-muted-foreground">
                                A specialized initiative by final year pharmacy students to integrate advanced computation into clinical practice.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid gap-10 mt-20">
                        <div className="card-surface p-12 space-y-10 relative overflow-hidden glass border-primary/10">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 pointer-events-none scale-150">
                                <GraduationCap className="h-64 w-64" />
                            </div>
                            
                            <div className="space-y-6 relative z-10">
                                <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary border border-primary/20">
                                    <Award className="h-4 w-4" />
                                    Accredited Project Team
                                </div>
                                <h2 className="text-4xl font-black tracking-tighter uppercase text-foreground">Principal Investigator</h2>
                                <p className="text-2xl font-bold text-muted-foreground leading-snug">
                                    This strategic clinical-AI project is spearheaded by <br/>
                                    <span className="text-foreground underline decoration-primary underline-offset-8">Azhar Nawaz</span> <br/>
                                    <span className="text-lg opacity-70">& Dedicated Research Co-members.</span>
                                </p>
                                <p className="text-sm font-black uppercase tracking-[0.2em] text-primary pt-2">
                                    Final Year Pharmacy Students
                                </p>
                            </div>

                            <div className="grid gap-10 sm:grid-cols-2 pt-10 border-t border-border relative z-10">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        Mission Protocol
                                    </h3>
                                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                        To deploy high-fidelity predictive intelligence within clinical maternity units, minimizing diagnostic latency and maximizing patient safety through data-driven insight.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        Pharmacology Link
                                    </h3>
                                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                        Bridging pharmaceutical science with machine learning to create evidence-based models that align with the rigorous standards of modern healthcare.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact/Connect */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-10 border-b border-border">
                            <div className="flex gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Collaboration</p>
                                    <p className="text-sm font-bold text-foreground">Open for Research</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Location</p>
                                    <p className="text-sm font-bold text-foreground">Clinical Unit 01</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all">
                                    <Github className="h-5 w-5" />
                                </button>
                                <button className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all">
                                    <Mail className="h-5 w-5" />
                                </button>
                                <button className="flex items-center gap-3 rounded-xl bg-foreground text-background px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-primary transition-all">
                                    Get Protocol
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="text-center py-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">
                                © 2026 MaternalAI Research Systems | Clinical Pharmacy Intelligence
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
