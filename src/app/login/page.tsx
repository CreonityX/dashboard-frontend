"use client";

import { useUser } from "@/lib/UserContext";
import { motion } from "framer-motion";
import { Palette, Building2, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { user, login, isLoading } = useUser();
    const router = useRouter();

    // If already logged in, redirect to dashboard
    useEffect(() => {
        if (!isLoading && user) {
            router.push("/");
        }
    }, [isLoading, user, router]);

    if (isLoading || user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-zinc-700 border-t-[#a3e635] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-grid-zinc opacity-30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#a3e635]/[0.04] rounded-full blur-[120px] pointer-events-none" />

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="mb-12 flex flex-col items-center gap-4 relative z-10"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900/50 rounded-sm flex items-center justify-center border border-zinc-800 shadow-inner">
                        <div className="w-5 h-5 bg-[#a3e635] rounded-full shadow-[0_0_12px_#a3e635] animate-pulse-glow" />
                    </div>
                    <span className="font-display font-bold text-white text-2xl tracking-tight">CREONITY</span>
                </div>
                <p className="text-zinc-500 font-mono text-xs tracking-wider uppercase">Select your dashboard</p>
            </motion.div>

            {/* Role Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl relative z-10">
                {/* Creator Card */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                    onClick={() => login("creator")}
                    className="group relative p-8 rounded-sm border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl text-left transition-all duration-300 hover:border-[#a3e635]/50 hover:shadow-[0_0_40px_rgba(163,230,53,0.08)] press-effect overflow-hidden"
                >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#a3e635]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center group-hover:border-[#a3e635]/30 transition-colors">
                                <Palette className="w-6 h-6 text-[#a3e635]" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-[#a3e635] group-hover:translate-x-1 transition-all duration-200" />
                        </div>

                        <h2 className="text-lg font-display font-bold text-white mb-2 tracking-tight">CREATOR</h2>
                        <p className="text-xs text-zinc-500 font-mono leading-relaxed mb-4">
                            Manage projects, track earnings, discover gigs, and grow your creator career.
                        </p>

                        <div className="flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-[#a3e635]" />
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Projects • Analytics • Finance</span>
                        </div>
                    </div>
                </motion.button>

                {/* Brand Card */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
                    onClick={() => login("brand")}
                    className="group relative p-8 rounded-sm border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl text-left transition-all duration-300 hover:border-[#8b5cf6]/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] press-effect overflow-hidden"
                >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center group-hover:border-[#8b5cf6]/30 transition-colors">
                                <Building2 className="w-6 h-6 text-[#8b5cf6]" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-[#8b5cf6] group-hover:translate-x-1 transition-all duration-200" />
                        </div>

                        <h2 className="text-lg font-display font-bold text-white mb-2 tracking-tight">BRAND</h2>
                        <p className="text-xs text-zinc-500 font-mono leading-relaxed mb-4">
                            Launch campaigns, discover creators, review content, and manage brand partnerships.
                        </p>

                        <div className="flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-[#8b5cf6]" />
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Campaigns • Creators • Insights</span>
                        </div>
                    </div>
                </motion.button>
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12 text-center relative z-10"
            >
                <p className="text-[10px] text-zinc-700 font-mono uppercase tracking-widest">v0.1.0 // Unified Dashboard</p>
            </motion.div>
        </div>
    );
}
