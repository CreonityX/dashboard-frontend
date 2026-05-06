"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CREATORS_TABS } from "@/lib/brand-data";

interface CreatorsShellProps {
    children?: ReactNode;
    activeTab: string;
    onTabChange: (id: string) => void;
}

export function CreatorsShell({ activeTab, onTabChange, children }: CreatorsShellProps) {
    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            <aside className="w-full lg:w-64 flex-shrink-0 bg-zinc-900/40 border-b lg:border-b-0 lg:border-r border-zinc-800 overflow-x-auto lg:overflow-y-auto">
                <nav className="p-2 flex lg:flex-col gap-2 min-w-max lg:min-w-0">
                    {CREATORS_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 text-left group border border-transparent whitespace-nowrap lg:whitespace-normal",
                                    isActive
                                        ? "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/20"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-800"
                                )}
                            >
                                <tab.icon className={cn(
                                    "w-4 h-4 transition-colors shrink-0",
                                    isActive ? "text-[#a3e635]" : "text-zinc-600 group-hover:text-zinc-400"
                                )} />
                                <span className="text-xs font-mono font-medium uppercase tracking-tight">{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>
                <div className="p-4 mt-4 border-t border-zinc-800 hidden lg:block">
                    <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-sm">
                        <div className="text-[10px] font-bold text-white uppercase mb-1 font-display tracking-widest">Creators_Core</div>
                        <div className="text-[10px] text-zinc-500 mb-2 font-mono">TALENT_DISCOVERY // {activeTab.toUpperCase().replace(/-/g, '_')}</div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                            <span className="text-[9px] text-[#a3e635] font-mono">LIVE</span>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 overflow-hidden flex flex-col relative backdrop-blur-md">
                <div className="absolute top-0 right-0 p-4 pointer-events-none z-20">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-zinc-700/50 rounded-sm" />
                        <div className="w-1 h-1 bg-zinc-700/50 rounded-sm" />
                        <div className="w-1 h-1 bg-[#a3e635]/50 rounded-sm" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />
                <div className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>
                <div className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none relative z-10">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-sm" />
                        VIEW: {activeTab.toUpperCase().replace(/-/g, '_')}
                    </span>
                    <span className="text-[#a3e635]/50">CREATORS_V1</span>
                </div>
            </main>
        </div>
    );
}
