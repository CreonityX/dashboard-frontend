"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LifeBuoy, MessageSquare, HelpCircle, PlayCircle, Lightbulb, Activity, Search } from "lucide-react";

interface SupportShellProps {
    children?: ReactNode;
    activeTab: string;
    onTabChange: (id: string) => void;
}

const SUPPORT_TABS = [
    { id: 'help-center', label: 'Help Center', icon: Search },
    { id: 'contact', label: 'Contact Support', icon: MessageSquare },
    { id: 'tickets', label: 'My Tickets', icon: LifeBuoy },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'tutorials', label: 'Video Tutorials', icon: PlayCircle },
    { id: 'features', label: 'Feature Requests', icon: Lightbulb },
    { id: 'status', label: 'Platform Status', icon: Activity },
];

export function SupportShell({ activeTab, onTabChange, children }: SupportShellProps) {
    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 bg-zinc-900/40 border-r border-zinc-800 overflow-y-auto">
                <nav className="p-2 space-y-1">
                    {SUPPORT_TABS.map((tab) => {
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

                {/* Emergency Contact */}
                <div className="p-4 mt-4 border-t border-zinc-800">
                    <div className="bg-red-950/10 border border-red-900/30 p-3 rounded-sm">
                        <div className="text-[10px] font-bold text-red-500 uppercase mb-1 font-display">Critical Issue?</div>
                        <div className="text-[10px] text-zinc-500 mb-3 leading-tight font-mono">For system outages or security breaches.</div>
                        <button className="w-full py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded-sm text-[10px] font-bold uppercase transition-colors">
                            Emergencylines
                        </button>
                    </div>
                </div>
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
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none relative z-10">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-sm"></span>
                        SECTION: {activeTab.toUpperCase()}
                    </span>
                    <span className="text-[#a3e635]/50">AGENT_STATUS: ONLINE</span>
                </div>
            </main>
        </div>
    );
}
