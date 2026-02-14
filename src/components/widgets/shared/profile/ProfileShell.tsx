"use client";

import { ReactNode, useState } from "react";
import { User, Edit3, ShieldCheck, Lock, FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileShellProps {
    children?: ReactNode;
    activeTab: string;
    onTabChange: (id: string) => void;
}

const PROFILE_TABS = [
    { id: 'public', label: 'Public Profile', icon: Eye },
    { id: 'edit', label: 'Edit Profile', icon: Edit3 },
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'mediakit', label: 'Media Kit', icon: FileText },
    { id: 'privacy', label: 'Privacy', icon: Lock },
];

export function ProfileShell({ activeTab, onTabChange, children }: ProfileShellProps) {
    return (
        <div className="flex flex-col h-full gap-6">
            {/* Top Navigation Bar */}
            <div className="flex items-center gap-1 bg-zinc-900/50 border border-white/5 p-1 rounded-lg backdrop-blur-sm self-start">
                {PROFILE_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 text-xs font-mono font-medium uppercase tracking-wide",
                                isActive
                                    ? "bg-[#a3e635] text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon className={cn("w-3.5 h-3.5", isActive ? "text-current" : "text-zinc-600")} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <main className="flex-1 bg-zinc-900/20 border border-white/5 rounded-lg overflow-hidden flex flex-col relative min-h-[600px]">
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 p-4 pointer-events-none z-0">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    </div>
                </div>

                {/* Live Content */}
                <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-6 border-t border-white/5 bg-black/40 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none backdrop-blur-md">
                    <span>VIEW_MODE: {activeTab.toUpperCase()}</span>
                    <span>PROFILE_ID: USR_8821_X</span>
                </div>
            </main>
        </div>
    );
}
