"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FINANCE_TABS } from "@/lib/mock-data";

interface FinanceShellProps {
    children?: ReactNode;
    activeTab: string;
    onTabChange: (id: string) => void;
}

export function FinanceShell({ activeTab, onTabChange, children }: FinanceShellProps) {
    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 bg-zinc-900/40 border-r border-zinc-800 overflow-y-auto">
                <nav className="p-2 space-y-1">
                    {FINANCE_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 text-left group border border-transparent",
                                    isActive
                                        ? "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/20"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-800"
                                )}
                            >
                                <tab.icon className={cn(
                                    "w-4 h-4 transition-colors",
                                    isActive ? "text-[#a3e635]" : "text-zinc-600 group-hover:text-zinc-400"
                                )} />
                                <span className="text-xs font-mono font-medium uppercase tracking-tight">{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Finance Matrix Header (Sidebar) */}
                <div className="p-4 mt-4 border-t border-zinc-800">
                    <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-sm">
                        <div className="text-[10px] font-bold text-white uppercase mb-1 font-display tracking-widest">Finance_Matrix</div>
                        <div className="text-[10px] text-zinc-500 mb-2 leading-tight font-mono">WALLET_CORE // {activeTab.toUpperCase()}</div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                            <span className="text-[9px] text-[#a3e635] font-mono">SECURE_LINK</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden flex flex-col relative backdrop-blur-md">
                {/* Header Decoration */}
                <div className="absolute top-0 right-0 p-4 pointer-events-none z-20">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-zinc-700/50 rounded-sm" />
                        <div className="w-1 h-1 bg-zinc-700/50 rounded-sm" />
                        <div className="w-1 h-1 bg-[#a3e635]/50 rounded-sm" />
                    </div>
                </div>

                {/* Content Background (Noise) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

                {/* Live Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none relative z-10">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-sm"></span>
                        MODULE: {activeTab.toUpperCase()}
                    </span>
                    <span className="text-[#a3e635]/50 flex items-center gap-2">
                        ENCRYPTION: AES-256
                    </span>
                </div>
            </main>
        </div>
    );
}
