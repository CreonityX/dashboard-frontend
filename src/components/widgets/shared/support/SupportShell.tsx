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
        <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 bg-zinc-900/20 border border-white/5 rounded-lg overflow-y-auto">
                <div className="p-4 border-b border-white/5 bg-zinc-900/40">
                    <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Support_Hub</h2>
                </div>
                <nav className="p-2 space-y-1">
                    {SUPPORT_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 text-left group",
                                    isActive
                                        ? "bg-[#a3e635]/10 text-[#a3e635] border-l-2 border-[#a3e635]"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] border-l-2 border-transparent"
                                )}
                            >
                                <tab.icon className={cn(
                                    "w-4 h-4 transition-colors",
                                    isActive ? "text-[#a3e635]" : "text-zinc-600 group-hover:text-zinc-400"
                                )} />
                                <span className="text-xs font-mono font-medium uppercase">{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Emergency Contact */}
                <div className="p-4 mt-4 border-t border-white/5">
                    <div className="bg-red-950/20 border border-red-900/30 p-3 rounded-sm">
                        <div className="text-[10px] font-bold text-red-400 uppercase mb-1">Critical Issue?</div>
                        <div className="text-[10px] text-red-500/80 mb-2 leading-tight">For system outages or security breaches.</div>
                        <button className="w-full py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded-sm text-[10px] font-bold uppercase transition-colors">
                            Emergencylines
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
                    </div>
                </div>

                {/* Live Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-6 border-t border-white/5 bg-black/20 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none">
                    <span>SECTION: {activeTab.toUpperCase()}</span>
                    <span>AGENT_STATUS: ONLINE</span>
                </div>
            </main>
        </div>
    );
}
