"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsShellProps {
    children?: ReactNode;
}

import { SETTINGS_TABS } from "@/lib/mock-data";

export function SettingsShell({ activeTab, onTabChange, children }: { activeTab: string, onTabChange: (id: string) => void, children: ReactNode }) {

    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 bg-zinc-900/40 border-b lg:border-b-0 lg:border-r border-zinc-800 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden">
                <nav className="p-2 flex lg:flex-col gap-2 min-w-max lg:min-w-0">
                    {SETTINGS_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const isDanger = tab.variant === 'danger';
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 text-left group border border-transparent whitespace-nowrap lg:whitespace-normal",
                                    isActive
                                        ? "bg-[#a3e635]/10 text-white border-[#a3e635]/20"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-800",
                                    isDanger && !isActive && "text-red-900/50 hover:text-red-500 hover:bg-red-950/20",
                                    isDanger && isActive && "bg-red-950/20 text-red-500 border border-red-900/20"
                                )}
                            >
                                <tab.icon className={cn(
                                    "w-4 h-4 transition-colors shrink-0",
                                    isActive ? (isDanger ? "text-red-500" : "text-[#a3e635]") : "text-zinc-600 group-hover:text-zinc-400",
                                    isDanger && !isActive && "text-red-900/50 group-hover:text-red-500"
                                )} />
                                <span className="text-xs font-mono font-medium tracking-tight uppercase">{tab.label}</span>
                                {isActive && !isDanger && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635] hidden lg:block" />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-zinc-900/40 overflow-hidden flex flex-col relative backdrop-blur-md">
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
                <div className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none relative z-10">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-sm"></span>
                        MODULE_ID: {activeTab.toUpperCase()}
                    </span>
                    <span className="text-[#a3e635]/50">STATUS: READY</span>
                </div>
            </main>
        </div>
    );
}
