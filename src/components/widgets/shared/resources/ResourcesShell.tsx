"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResourcesShellProps {
    children?: ReactNode;
    activeTab: string;
    onTabChange: (id: string) => void;
}

import { RESOURCE_TABS } from "@/lib/mock-data";

import { useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";

export function ResourcesShell({ activeTab, onTabChange, children }: ResourcesShellProps) {
    const [showMobileMenu, setShowMobileMenu] = useState(true);

    const handleTabClick = (id: string) => {
        onTabChange(id);
        setShowMobileMenu(false);
    };

    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            {/* Sidebar Navigation */}
            <aside className={cn(
                "w-full lg:w-64 flex-shrink-0 bg-zinc-900/40 lg:border-r border-zinc-800 overflow-y-auto",
                // Mobile: Only show when menu is active
                showMobileMenu ? "flex flex-col h-full" : "hidden lg:flex lg:flex-col"
            )}>
                <nav className="p-4 space-y-2 lg:p-2 lg:space-y-1 lg:flex-1 lg:overflow-y-auto">
                    {RESOURCE_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 text-left group border border-transparent whitespace-nowrap lg:whitespace-normal",
                                    isActive
                                        ? "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/20"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-800"
                                )}
                            >
                                <tab.icon className={cn(
                                    "w-4 h-4 transition-colors shrink-0",
                                    isActive ? "text-[#a3e635]" : "text-zinc-600 group-hover:text-zinc-400"
                                )} />
                                <span className="text-xs font-mono font-medium uppercase tracking-tight flex-1">{tab.label}</span>

                                {/* Mobile Chevron */}
                                <ChevronRight className="w-4 h-4 text-zinc-700 lg:hidden" />
                            </button>
                        );
                    })}
                </nav>

                {/* Promo Box - Hidden on mobile menu list for cleaner look */}
                <div className="p-4 mt-auto border-t border-zinc-800 hidden lg:block flex-shrink-0">
                    <div className="bg-gradient-to-br from-[#a3e635]/5 to-zinc-900 border border-[#a3e635]/20 p-3 rounded-sm">
                        <div className="text-[10px] font-bold text-[#a3e635] uppercase mb-1 font-display">Pro Membership</div>
                        <div className="text-[10px] text-zinc-500 mb-3 leading-tight font-mono">Unlock premium courses and advanced analytics.</div>
                        <button className="w-full py-1.5 bg-[#a3e635]/10 hover:bg-[#a3e635]/20 text-[#a3e635] border border-[#a3e635]/30 rounded-sm text-[10px] font-bold uppercase transition-colors">
                            Upgrade_Now
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={cn(
                "flex-1 bg-zinc-900/40 overflow-hidden flex flex-col relative backdrop-blur-md",
                // Mobile: Hide when menu is showing
                showMobileMenu ? "hidden lg:flex" : "flex"
            )}>
                {/* Header Decoration */}
                <div className="absolute top-0 right-0 p-4 pointer-events-none z-20">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-zinc-700/50 rounded-sm" />
                        <div className="w-1 h-1 bg-zinc-700/50 rounded-sm" />
                        <div className="w-1 h-1 bg-[#a3e635]/50 rounded-sm" />
                    </div>
                </div>

                {/* Mobile Back Button Header - Simplified */}
                <div className="lg:hidden flex items-center p-4 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-30">
                    <button
                        onClick={() => setShowMobileMenu(true)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-xs font-mono uppercase">Back_To_Menu</span>
                    </button>
                </div>

                {/* Content Background (Noise) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

                {/* Live Content */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none relative z-10">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-sm"></span>
                        MODULE: {activeTab.toUpperCase()}
                    </span>
                    <span className="text-[#a3e635]/50">DB_VERSION: v2.4.1</span>
                </div>
            </main>
        </div>
    );
}
