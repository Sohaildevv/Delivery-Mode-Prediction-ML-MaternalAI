"use client";

import { predictDelivery } from "@/lib/api";
import type { PredictionInput, PredictionResponse } from "@/lib/types";
import { Loader2, ArrowLeft, Printer, ShieldCheck, AlertCircle, CheckCircle2, History, ChevronRight, Activity } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const defaultValues: PredictionInput = {
    age: 28,
    blood_pressure: 120,
    blood_sugar: 95,
    heart_rate: 80,
    hemoglobin: 11.5,
    bmi: 26.0,
    previous_c_section: 0,
    number_of_pregnancies: 2,
    parity: 1,
    anc_visits: 5,
    fetal_heart_rate: 145,
    baby_position: 0,
    gestational_age: 38,
    preeclampsia: 0,
};

export default function PredictPage() {
    const [form, setForm] = useState<PredictionInput>(defaultValues);
    const [result, setResult] = useState<PredictionResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    const handleChange = (key: keyof PredictionInput, value: string | number) => {
        setForm((prev) => ({ ...prev, [key]: typeof value === "string" ? Number(value) : value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await predictDelivery(form);
            if (!response.success) {
                setError(response.error || "Prediction service returned an error.");
            } else {
                setResult(response);
            }
        } catch (err) {
            setError("Unable to connect to the prediction service.");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        if (!result) return;
        window.print();
    };

    return (
        <main className="min-h-screen px-6 py-10 lg:px-14 bg-background">
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    nav, button, .no-print, .predict-form { display: none !important; }
                    .print-area { display: block !important; width: 100% !important; margin: 0 !important; padding: 40px !important; }
                    .card-surface { box-shadow: none !important; border: 1px solid #e2e8f0 !important; }
                    body { background: white !important; }
                }
            `}} />

            <div className="main-container space-y-10 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-10"
                >
                    <div className="space-y-4">
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors no-print"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Return to Command
                        </Link>
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter uppercase text-foreground">Diagnostic Unit</h1>
                            <p className="mt-2 text-muted-foreground font-medium">
                                Clinical parameter input for AI-driven risk assessment.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 no-print">
                        <Link 
                            href="/dashboard"
                            className="flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-bold text-sm uppercase tracking-widest text-foreground hover:bg-accent transition-all"
                        >
                            <History className="h-4 w-4" />
                            Archives
                        </Link>
                    </div>
                </motion.div>

                <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
                    {/* Prediction Form */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="predict-form"
                    >
                        <form onSubmit={handleSubmit} className="card-surface p-8 space-y-8 glass">
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { label: "Patient Age", key: "age", min: 15, max: 50 },
                                    { label: "Systolic BP", key: "blood_pressure", min: 80, max: 200 },
                                    { label: "Blood Sugar", key: "blood_sugar", min: 50, max: 300 },
                                    { label: "Heart Rate", key: "heart_rate", min: 40, max: 150 },
                                    { label: "Hemoglobin", key: "hemoglobin", min: 5, max: 20 },
                                    { label: "Body Mass Index", key: "bmi", min: 15, max: 50 },
                                    { label: "Prev C-Section", key: "previous_c_section", type: "select", options: [{l: "Non-Reactive", v: 0}, {l: "Reactive", v: 1}] },
                                    { label: "Gravida Count", key: "number_of_pregnancies", min: 0, max: 20 },
                                    { label: "Parity", key: "parity", min: 0, max: 20 },
                                    { label: "ANC Schedule", key: "anc_visits", min: 0, max: 20 },
                                    { label: "Fetal HR", key: "fetal_heart_rate", min: 100, max: 200 },
                                    { label: "Gestational Age", key: "gestational_age", min: 20, max: 45 },
                                    { label: "Fetal Position", key: "baby_position", type: "select", options: [{l: "Cephalic", v: 0}, {l: "Breech", v: 1}] },
                                    { label: "Preeclampsia", key: "preeclampsia", type: "select", options: [{l: "Negative", v: 0}, {l: "Positive", v: 1}] },
                                ].map((item) => (
                                    <div key={item.key} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                            {item.label}
                                        </label>
                                        {item.type === "select" ? (
                                            <select
                                                value={form[item.key as keyof PredictionInput]}
                                                onChange={(e) => handleChange(item.key as keyof PredictionInput, e.target.value)}
                                                className="w-full"
                                            >
                                                {item.options?.map(opt => (
                                                    <option key={opt.v} value={opt.v}>{opt.l}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="number"
                                                step={item.key === 'hemoglobin' || item.key === 'bmi' ? "0.1" : "1"}
                                                value={form[item.key as keyof PredictionInput]}
                                                onChange={(e) => handleChange(item.key as keyof PredictionInput, e.target.value)}
                                                className="w-full"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-4 pt-6 border-t border-border">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 rounded-xl bg-primary py-4 font-black uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                                >
                                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                                    {loading ? "Analyzing Matrix..." : "Execute Assessment"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setForm(defaultValues)}
                                    className="rounded-xl border border-border glass px-8 py-4 font-black uppercase tracking-widest text-foreground hover:bg-secondary transition-all"
                                >
                                    Clear
                                </button>
                            </div>
                            
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 rounded-xl bg-destructive/10 p-4 text-destructive border border-destructive/20"
                                >
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Result Panel */}
                    <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="card-surface p-8 print-area relative overflow-hidden" ref={printRef}>
                            <div className="absolute top-0 right-0 p-1 opacity-[0.02] rotate-12 pointer-events-none">
                                <Activity className="h-64 w-64" />
                            </div>

                            <div className="mb-8 flex items-center justify-between relative z-10">
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Output Matrix</h2>
                                {result && (
                                    <button 
                                        onClick={handlePrint}
                                        className="no-print p-2 rounded-lg border border-border hover:bg-secondary transition-colors text-muted-foreground"
                                    >
                                        <Printer className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div 
                                        key="result"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-10 relative z-10"
                                    >
                                        <div className={`relative overflow-hidden rounded-2xl p-10 text-center space-y-4 border ${
                                            result.data.risk === 'High'
                                                ? 'bg-destructive/5 text-destructive border-destructive/20'
                                                : 'bg-green-500/5 text-green-500 border-green-500/20'
                                        }`}>
                                            <div className="absolute top-0 right-0 p-4">
                                                {result.data.risk === 'High' ? <AlertCircle className="h-10 w-10 opacity-20" /> : <CheckCircle2 className="h-10 w-10 opacity-20" />}
                                            </div>
                                            
                                            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">Diagnostic Projection</p>
                                            <h3 className="text-4xl font-black tracking-tighter uppercase">{result.data.prediction}</h3>
                                            
                                            <div className="flex items-center justify-center gap-8 pt-6">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] opacity-60 font-black uppercase">Confidence</p>
                                                    <p className="text-3xl font-black">{(result.data.probability * 100).toFixed(0)}<span className="text-sm">%</span></p>
                                                </div>
                                                <div className="h-12 w-px bg-current opacity-10"></div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] opacity-60 font-black uppercase">Risk Stratum</p>
                                                    <p className="text-3xl font-black uppercase tracking-tighter">{result.data.risk}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                                                <div className="h-1 w-1 rounded-full bg-primary"></div>
                                                Parameters Summary
                                            </h4>
                                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[11px] font-bold uppercase tracking-widest">
                                                <div className="flex justify-between border-b border-border py-2">
                                                    <span className="text-muted-foreground">Age</span>
                                                    <span className="text-foreground">{form.age}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-border py-2">
                                                    <span className="text-muted-foreground">Matrix BP</span>
                                                    <span className="text-foreground">{form.blood_pressure}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-border py-2">
                                                    <span className="text-muted-foreground">Gestation</span>
                                                    <span className="text-foreground">{form.gestational_age}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-border py-2">
                                                    <span className="text-muted-foreground">Surgical History</span>
                                                    <span className="text-foreground">{form.previous_c_section === 1 ? 'YES' : 'NO'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl bg-secondary/50 p-6 border border-border">
                                            <p className="text-[10px] font-bold text-muted-foreground leading-relaxed text-center uppercase tracking-tighter">
                                                INTELLIGENCE DISCLAIMER: Output generated via Random Forest Analysis. 
                                                Cross-reference with primary clinical judgment required. 
                                                System ID: AI-MTRN-V1
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-32 text-center space-y-6 border-2 border-dashed border-border rounded-2xl bg-secondary/10"
                                    >
                                        <div className="h-16 w-16 rounded-full bg-background border border-border flex items-center justify-center shadow-inner">
                                            <ShieldCheck className="h-8 w-8 text-muted-foreground opacity-30" />
                                        </div>
                                        <div className="max-w-[200px] space-y-2">
                                            <p className="text-xs font-black uppercase tracking-widest text-foreground">Waiting for Input</p>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed font-bold uppercase tracking-tighter">Initialize diagnostic matrix to generate assessment.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
