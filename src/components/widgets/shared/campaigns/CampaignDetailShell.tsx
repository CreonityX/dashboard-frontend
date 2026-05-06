"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CAMPAIGN_DETAIL_TABS, CAMPAIGNS_LIST } from "@/lib/brand-data";
import { ArrowLeft } from "lucide-react";

interface CampaignDetailShellProps {
    campaignId: string;
    activeTab: string;
    onTabChange: (id: string) => void;
    children?: ReactNode;
}

export function CampaignDetailShell({ campaignId, activeTab, onTabChange, children }: CampaignDetailShellProps) {
    const campaign = CAMPAIGNS_LIST.find(c => c.id === campaignId);

    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 bg-zinc-900/40 border-b lg:border-b-0 lg:border-r border-zinc-800 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden">
                {/* Back + Campaign Identity */}
                <div className="p-4 border-b border-zinc-800 hidden lg:block">
                    <Link
                        href="/campaigns"
                        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 text-xs font-mono uppercase"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        All_Campaigns
                    </Link>
                    <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-sm">
                        <div className="text-[10px] font-mono text-zinc-500 mb-1 uppercase">Campaign</div>
                        <div className="text-xs font-bold text-white font-display truncate mb-2">{campaign?.name || "Campaign"}</div>
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm",
                                campaign?.status === 'active' ? "bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20" : "bg-zinc-800 text-zinc-400"
                            )}>
                                {campaign?.status || "draft"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Mobile Back */}
                <div className="flex items-center gap-3 p-3 border-b border-zinc-800 lg:hidden">
                    <Link href="/campaigns" className="p-1.5 text-zinc-500 hover:text-white">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <span className="text-xs font-bold text-white font-display truncate">{campaign?.name}</span>
                </div>

                {/* Tab Nav */}
                <nav className="p-2 flex lg:flex-col gap-1 min-w-max lg:min-w-0 overflow-x-auto lg:overflow-x-visible">
                    {CAMPAIGN_DETAIL_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 text-left group border border-transparent whitespace-nowrap lg:whitespace-normal w-full",
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
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635] hidden lg:block" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Sidebar Info */}
                <div className="p-4 mt-4 border-t border-zinc-800 hidden lg:block">
                    <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-sm">
                        <div className="text-[10px] font-bold text-white uppercase mb-1 font-display tracking-widest">Campaign_Core</div>
                        <div className="text-[10px] text-zinc-500 mb-2 font-mono">TAB // {activeTab.toUpperCase()}</div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                            <span className="text-[9px] text-[#a3e635] font-mono">LIVE</span>
                        </div>
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

                {/* Noise overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none relative z-10">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-sm" />
                        TAB: {activeTab.toUpperCase()}
                    </span>
                    <span className="text-[#a3e635]/50">CAMPAIGN_ID: {campaignId.toUpperCase()}</span>
                </div>
            </main>
        </div>
    );
}
