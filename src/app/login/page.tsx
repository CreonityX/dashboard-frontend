"use client";

import { useUser } from "@/lib/UserContext";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github, Chrome, Apple, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const { user, login, isLoading } = useUser();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If already logged in, redirect to dashboard
    useEffect(() => {
        if (!isLoading && user) {
            router.push("/");
        }
    }, [isLoading, user, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || "Failed to login");
        } finally {
            setIsSubmitting(false);
        }
    };

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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#a3e635]/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8b5cf6]/[0.03] rounded-full blur-[100px] pointer-events-none" />

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo & Header */}
                <div className="mb-10 flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-900/80 rounded-sm flex items-center justify-center border border-zinc-800 shadow-inner">
                            <div className="w-5 h-5 bg-[#a3e635] rounded-full shadow-[0_0_12px_#a3e635] animate-pulse-glow" />
                        </div>
                        <span className="font-display font-bold text-white text-2xl tracking-tight">CREONITY</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-display font-bold text-white tracking-tight mt-4">Welcome back</h1>
                        <p className="text-zinc-500 font-mono text-xs tracking-wider uppercase mt-2">Enter your credentials to continue</p>
                    </div>
                </div>

                {/* Login Form Card */}
                <div className="p-8 rounded-xl border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Inner subtle glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#a3e635]/20 to-transparent" />
                    
                    <form onSubmit={handleLogin} className="space-y-5">
                        
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-3"
                            >
                                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                <p className="text-xs text-red-400 font-mono">{error}</p>
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider pl-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-zinc-500 group-focus-within:text-[#a3e635] transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#a3e635]/50 focus:ring-1 focus:ring-[#a3e635]/50 transition-all font-mono"
                                        placeholder="creator@creonity.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between pl-1">
                                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Password</label>
                                    <a href="#" className="text-[10px] font-mono text-zinc-500 hover:text-[#a3e635] transition-colors">Forgot?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-zinc-500 group-focus-within:text-[#a3e635] transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#a3e635]/50 focus:ring-1 focus:ring-[#a3e635]/50 transition-all font-mono"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 px-4 bg-[#a3e635] hover:bg-[#bbf7d0] text-black font-mono text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>SIGN IN</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-1 h-px bg-zinc-800/50"></div>
                        <span className="px-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Or continue with</span>
                        <div className="flex-1 h-px bg-zinc-800/50"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:border-zinc-700 transition-all text-zinc-300 text-xs font-mono">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:border-zinc-700 transition-all text-zinc-300 text-xs font-mono">
                            <Apple className="w-4 h-4" />
                            Apple
                        </button>
                    </div>

                </div>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-zinc-500 font-mono">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-[#a3e635] hover:text-[#bbf7d0] transition-colors underline-offset-4 hover:underline">
                            Request access
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
