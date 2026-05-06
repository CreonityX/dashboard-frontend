"use client";

import { useState } from "react";
import { MessageSquare, FileText, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { WORKING_WITH_COLLABORATIONS, MOCK_CAMPAIGNS } from "@/lib/brand-data";
import Link from "next/link";

export function WorkingWithTab() {
    const [campaignFilter, setCampaignFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const campaigns = [...new Set(WORKING_WITH_COLLABORATIONS.map(c => c.campaign))];
    const filtered = WORKING_WITH_COLLABORATIONS.filter(c => {
        if (campaignFilter && c.campaign !== campaignFilter) return false;
        if (statusFilter && c.status !== statusFilter) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Working_With</h2>
                <div className="flex gap-2">
                    <select value={campaignFilter} onChange={e => setCampaignFilter(e.target.value)} className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">
                        <option value="">All campaigns</option>
                        {campaigns.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">
                        <option value="">Status: All</option>
                        <option value="in_progress">In progress</option>
                        <option value="awaiting_approval">Awaiting approval</option>
                    </select>
                </div>
            </div>

            <p className="text-[11px] text-zinc-500 font-mono">Current active collaborations. Message, view content, or process payment.</p>

            <div className="space-y-3">
                {filtered.map(collab => (
                    <div key={collab.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors">
                        <div className="w-12 h-12 rounded-sm bg-zinc-800 flex items-center justify-center text-sm font-bold text-[#a3e635] shrink-0">{collab.creator.substring(0, 2)}</div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white">{collab.creator}</div>
                            <div className="text-[10px] text-zinc-500 font-mono">{collab.campaign}</div>
                            <div className="flex items-center gap-3 mt-1">
                                <span className={cn(
                                    "text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase",
                                    collab.status === "in_progress" && "bg-blue-500/10 text-blue-400",
                                    collab.status === "awaiting_approval" && "bg-[#a3e635]/10 text-[#a3e635]"
                                )}>{collab.status.replace("_", " ")}</span>
                                <span className="text-[10px] font-mono text-zinc-500">Milestones: {collab.milestones}</span>
                                <span className="text-[10px] font-mono text-zinc-600">Started {collab.startDate}</span>
                            </div>
                            <div className="text-[10px] text-zinc-500 mt-1">Next: {collab.nextAction}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Link href="/messages" className="p-2 border border-zinc-700 text-zinc-500 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635]" title="Message">
                                <MessageSquare className="w-4 h-4" />
                            </Link>
                            <Link href="/content-review" className="p-2 border border-zinc-700 text-zinc-500 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635]" title="View content">
                                <FileText className="w-4 h-4" />
                            </Link>
                            <Link href="/finance" className="p-2 border border-zinc-700 text-zinc-500 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635]" title="Pay">
                                <CreditCard className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
