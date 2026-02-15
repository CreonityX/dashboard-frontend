"use client";

import { SupportSection } from "@/components/widgets/shared/support/SupportComponents";
import { Search, Rocket, Compass, Wallet, UserCheck, ShieldAlert, FileText, ArrowRight } from "lucide-react";

const HELP_CATEGORIES = [
    { icon: Rocket, label: "Getting Started", desc: "Account setup & onboarding" },
    { icon: Compass, label: "Finding Gigs", desc: "Search & proposal tips" },
    { icon: Wallet, label: "Payments", desc: "Earnings, taxes & withdrawals" },
    { icon: UserCheck, label: "Verification", desc: "Identity & profile badges" },
    { icon: ShieldAlert, label: "Trust & Safety", desc: "Guidelines & disputes" },
    { icon: FileText, label: "Legal", desc: "Terms of service & privacy" },
];

export function HelpCenterHome() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in zoom-in-95 duration-500">
            {/* Search Hero */}
            <div className="relative h-64 rounded-sm bg-zinc-900 border border-white/5 overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

                <div className="relative z-10 max-w-lg w-full space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white font-display mb-2">How can we help you?</h1>
                        <p className="text-zinc-400 text-sm">Search our knowledge base for answers.</p>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#a3e635] transition-colors" />
                        <input
                            type="text"
                            placeholder="e.g. How do I withdraw funds?"
                            className="w-full bg-black/50 border border-zinc-700 rounded-full py-3 pl-10 pr-4 text-sm text-white focus:border-[#a3e635] focus:outline-none transition-all placeholder:text-zinc-600"
                        />
                    </div>
                </div>
            </div>

            {/* Popular Topics */}
            <SupportSection title="Browse Topics">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {HELP_CATEGORIES.map((cat) => (
                        <div key={cat.label} className="p-4 border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-[#a3e635]/30 rounded-sm cursor-pointer transition-all group">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-3 group-hover:bg-[#a3e635]/20 transition-colors">
                                <cat.icon className="w-5 h-5 text-zinc-400 group-hover:text-[#a3e635] transition-colors" />
                            </div>
                            <h3 className="text-sm font-bold text-white mb-1">{cat.label}</h3>
                            <p className="text-xs text-zinc-500">{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </SupportSection>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-white/5 bg-zinc-900/40 rounded-sm">
                    <h3 className="text-lg font-bold text-white font-display mb-2">Creator Academy</h3>
                    <p className="text-sm text-zinc-400 mb-4">Master the platform with our comprehensive video courses.</p>
                    <button className="flex items-center gap-2 text-xs font-bold text-[#a3e635] uppercase hover:underline">
                        Start_Learning <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                <div className="p-6 border border-white/5 bg-zinc-900/40 rounded-sm">
                    <h3 className="text-lg font-bold text-white font-display mb-2">Community Forum</h3>
                    <p className="text-sm text-zinc-400 mb-4">Connect with other creators and share tips.</p>
                    <button className="flex items-center gap-2 text-xs font-bold text-[#a3e635] uppercase hover:underline">
                        Join_Discussion <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
