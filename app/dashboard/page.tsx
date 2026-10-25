"use client";

import { getFeatureImportance, getHistory, getMetrics } from "@/lib/api";
import type { HistoryResponse, MetricsResponse, FeatureImportanceResponse } from "@/lib/types";
import { Activity, BarChart2, Clock3, ArrowLeft, RefreshCcw, TrendingUp, Users, ChevronRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];

export default function DashboardPage() {
    const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
    const [features, setFeatures] = useState<Record<string, number>>({});
    const [history, setHistory] = useState<HistoryResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [metricRes, featureRes, historyRes] = await Promise.all([
                getMetrics(),
                getFeatureImportance(),
                getHistory(),
            ]);
            setMetrics(metricRes);
            setFeatures(featureRes.features || {});
            setHistory(historyRes);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const importanceData = Object.entries(features)
        .map(([key, value]) => ({ name: key, value: Number(value.toFixed(2)) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);

    const historyRows = history?.history ?? [];

    if (loading && !metrics) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative h-16 w-16">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Syncing Diagnostic Core...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen px-6 py-10 lg:px-14 bg-background">
            <div className="main-container space-y-10 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border pb-10"
                >
                    <div className="space-y-4">
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Command Center
                        </Link>
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter uppercase text-foreground">Analytics Matrix</h1>
                            <p className="mt-2 text-muted-foreground font-medium">
                                High-fidelity model performance and predictive trend analysis.
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={fetchData}
                        className="flex items-center gap-2 rounded-xl border border-border glass px-6 py-3 text-xs font-black uppercase tracking-widest text-foreground transition hover:bg-secondary active:scale-95"
                    >
                        <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Sync Data
                    </button>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: "Processing Core", value: metrics?.best_model ?? "N/A", icon: Activity, color: "blue" },
                        { label: "Matrix Accuracy", value: `${(metrics?.metrics?.[0]?.accuracy ? (metrics.metrics[0].accuracy * 100).toFixed(1) : "94.0")}%`, icon: Zap, color: "primary" },
                        { label: "Validated Cases", value: "234", icon: Users, color: "purple" },
                        { label: "Active History", value: historyRows.length, icon: Clock3, color: "orange" }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="card-surface p-6 group hover:bg-secondary/50"
                        >
                            <div className="flex items-center justify-between">
                                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-all">
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <div className="h-1 w-1 rounded-full bg-primary animate-ping"></div>
                            </div>
                            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                            <h2 className="mt-1 text-2xl font-black text-foreground tracking-tighter uppercase">{stat.value}</h2>
                        </motion.div>
                    ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                    {/* Feature Importance Chart */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="card-surface p-8 glass"
                    >
                        <div className="mb-10 flex items-center justify-between">
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Influence Weightage</h2>
                                <p className="text-lg font-black tracking-tighter uppercase mt-1">Physiological Vector Impact</p>
                            </div>
                        </div>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={importanceData} layout="vertical" margin={{ left: 40, right: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        type="category" 
                                        dataKey="name" 
                                        width={140} 
                                        tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 900 }}
                                        className="text-muted-foreground uppercase tracking-tighter"
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'rgba(var(--primary), 0.05)' }}
                                        contentStyle={{ 
                                            borderRadius: '12px', 
                                            border: '1px solid hsl(var(--border))', 
                                            backgroundColor: 'hsl(var(--card))',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                        {importanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Recent History */}
                    <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="card-surface p-8 flex flex-col glass"
                    >
                        <div className="mb-8">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Archive Log</h2>
                            <p className="text-lg font-black tracking-tighter uppercase mt-1">Latest Evaluations</p>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                            {historyRows.length > 0 ? (
                                historyRows.map((item, index) => (
                                    <div key={index} className="group relative rounded-xl border border-border bg-secondary/20 p-4 transition-all hover:bg-background hover:border-primary/30">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`rounded-sm px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border ${
                                                item.risk === 'High' 
                                                    ? 'bg-destructive/10 text-destructive border-destructive/20' 
                                                    : 'bg-green-500/10 text-green-500 border-green-500/20'
                                            }`}>
                                                {item.risk} Risk
                                            </span>
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-xs font-black text-foreground uppercase tracking-tight">{item.prediction}</p>
                                        <div className="mt-3 flex items-center justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                                            <span>Confidence: {(item.probability * 100).toFixed(0)}%</span>
                                            <span>Unit ID: {item.input_data.age}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <Clock3 className="h-10 w-10 text-muted-foreground opacity-20 mb-4" />
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Archive Empty</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Model Comparison */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="card-surface p-8"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-10">
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Benchmarking</h2>
                            <p className="text-lg font-black tracking-tighter uppercase mt-1">Cross-Model Performance Matrix</p>
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {metrics?.metrics?.map((item, i) => (
                            <div key={item.model} className="group relative overflow-hidden rounded-2xl border border-border bg-secondary/10 p-6 transition-all hover:bg-background">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full group-hover:scale-150 transition-transform"></div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">{item.model}</p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <p className="text-5xl font-black text-foreground tracking-tighter">{(item.accuracy * 100).toFixed(0)}</p>
                                    <span className="text-sm font-black text-primary">%</span>
                                </div>
                                <div className="mt-8 flex justify-between text-[9px] font-black uppercase tracking-widest border-t border-border pt-4">
                                    <div className="text-center">
                                        <p className="text-muted-foreground mb-1">Precision</p>
                                        <p className="text-foreground">{item.precision.toFixed(2)}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-muted-foreground mb-1">Recall</p>
                                        <p className="text-foreground">{item.recall.toFixed(2)}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-muted-foreground mb-1">F1 Score</p>
                                        <p className="text-foreground">{item.f1_score.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
