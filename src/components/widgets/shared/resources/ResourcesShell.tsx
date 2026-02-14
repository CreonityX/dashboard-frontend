"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, Wrench, Users, TrendingUp, Newspaper } from "lucide-react";

interface ResourcesShellProps {
    children?: ReactNode;
    activeTab: string;
    onTabChange: (id: string) => void;
}

const RESOURCE_TABS = [
    { id: 'courses', label: 'Courses & Tutorials', icon: GraduationCap },
    { id: 'best-practices', label: 'Best Practices', icon: BookOpen },
    { id: 'tools', label: 'Templates & Tools', icon: Wrench },
    { id: 'community', label: 'Creator Community', icon: Users },
    { id: 'insights', label: 'Market Insights', icon: TrendingUp },
    { id: 'news', label: 'Blog & News', icon: Newspaper },
];

export function ResourcesShell({ activeTab, onTabChange, children }: ResourcesShellProps) {
    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 bg-zinc-900/20 border border-white/5 rounded-lg overflow-y-auto">
                <div className="p-4 border-b border-white/5 bg-zinc-900/40">
                    <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Knowledge_Base</h2>
                </div>
                <nav className="p-2 space-y-1">
                    {RESOURCE_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 text-left group",
                                    isActive
                                        ? "bg-purple-500/10 text-purple-400 border-l-2 border-purple-500"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] border-l-2 border-transparent"
                                )}
                            >
                                <tab.icon className={cn(
                                    "w-4 h-4 transition-colors",
                                    isActive ? "text-purple-400" : "text-zinc-600 group-hover:text-zinc-400"
                                )} />
                                <span className="text-xs font-mono font-medium uppercase">{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Promo Box */}
                <div className="p-4 mt-4 border-t border-white/5">
                    <div className="bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-500/20 p-3 rounded-sm">
                        <div className="text-[10px] font-bold text-purple-400 uppercase mb-1">Pro Membership</div>
                        <div className="text-[10px] text-zinc-500 mb-2 leading-tight">Unlock premium courses and advanced analytics.</div>
                        <button className="w-full py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-sm text-[10px] font-bold uppercase transition-colors">
                            Upgrade_Now
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-zinc-900/20 border border-white/5 rounded-lg overflow-hidden flex flex-col relative">
                {/* Header Decoration */}
                <div className="absolute top-0 right-0 p-4 pointer-events-none">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    </div>
                </div>

                {/* Live Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-6 border-t border-white/5 bg-black/20 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none">
                    <span>MODULE: {activeTab.toUpperCase()}</span>
                    <span>DB_VERSION: v2.4.1</span>
                </div>
            </main>
        </div>
    );
}
