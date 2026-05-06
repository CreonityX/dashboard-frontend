"use client";

import { useState } from "react";
import { MessageSquare, FileText, CreditCard, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CAMPAIGNS_LIST, CAMPAIGN_CREATORS } from "@/lib/brand-data";
import Link from "next/link";

export function CreatorsTab({ campaignId }: { campaignId: string }) {
    const campaign = CAMPAIGNS_LIST.find(c => c.id === campaignId);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const creators = CAMPAIGN_CREATORS.filter(c => c.campaignId === campaignId);
    const invited = 2;
    const applied = 3;
    const accepted = creators.filter(c => c.status === 'working' || c.status === 'completed').length;
    const working = creators.filter(c => c.status === 'working').length;
    const completed = creators.filter(c => c.status === 'completed').length;

    const statusBadge = (s: string) => {
        const map: Record<string, string> = {
            invited: "bg-zinc-700 text-zinc-400",
            applied: "bg-blue-500/10 text-blue-400",
            accepted: "bg-[#a3e635]/10 text-[#a3e635]",
            working: "bg-blue-500/10 text-blue-400",
            completed: "bg-zinc-600 text-zinc-300",
        };
        return map[s] || "bg-zinc-700 text-zinc-500";
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                    { label: "Invited", value: invited },
                    { label: "Applied", value: applied },
                    { label: "Accepted", value: accepted },
                    { label: "Working", value: working },
                    { label: "Completed", value: completed },
                ].map(s => (
                    <div key={s.label} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-3">
                        <div className="text-lg font-bold text-white font-mono">{s.value}</div>
                        <div className="text-[10px] font-mono text-zinc-500">{s.label}</div>
                    </div>
                ))}
            </div>
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Creators Involved</h2>
            <div className="space-y-2">
                {creators.map(cr => {
                    const isExpanded = expandedId === cr.id;
                    return (
                        <div key={cr.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors">
                            <div
                                className="p-4 flex items-center gap-4 cursor-pointer"
                                onClick={() => setExpandedId(isExpanded ? null : cr.id)}
                            >
                                <button className="p-0 text-zinc-500 shrink-0">
                                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </button>
                                <div className="w-12 h-12 rounded-sm bg-zinc-800 flex items-center justify-center text-sm font-bold text-[#a3e635] shrink-0">{cr.creator.substring(0, 2)}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-white">{cr.creator}</div>
                                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                                        <span className={cn("text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase", statusBadge(cr.status))}>{cr.status}</span>
                                        <span className="text-[10px] font-mono text-zinc-500">{cr.views} views</span>
                                        <span className="text-[10px] font-mono text-zinc-500">{cr.engagement}% eng</span>
                                        <span className="text-[10px] font-mono text-[#a3e635]">{cr.paymentStatus}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                                    <Link href="/messages" className="p-2 border border-zinc-700 rounded-sm text-zinc-500 hover:text-[#a3e635]" title="Message"><MessageSquare className="w-4 h-4" /></Link>
                                    <Link href="/content-review" className="p-2 border border-zinc-700 rounded-sm text-zinc-500 hover:text-[#a3e635]" title="View content"><FileText className="w-4 h-4" /></Link>
                                    <Link href="/finance" className="p-2 border border-zinc-700 rounded-sm text-zinc-500 hover:text-[#a3e635]" title="Payment"><CreditCard className="w-4 h-4" /></Link>
                                </div>
                            </div>
                            {isExpanded && (
                                <div className="border-t border-zinc-800 p-4 bg-zinc-950/50">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-mono">
                                        <div><span className="text-zinc-500">Performance</span><div className="text-white mt-0.5">{cr.views} views • {cr.engagement}% eng</div></div>
                                        <div><span className="text-zinc-500">Payment</span><div className="text-[#a3e635] mt-0.5">{cr.paymentStatus} • ${cr.amount}</div></div>
                                        <div><span className="text-zinc-500">Niche</span><div className="text-zinc-400 mt-0.5">Tech Reviews</div></div>
                                        <div><span className="text-zinc-500">Content</span><div className="text-zinc-400 mt-0.5">2 submitted, 1 approved</div></div>
                                    </div>
                                    <Link href={`/creators?tab=discover&creator=${cr.creatorId}`} className="inline-block mt-3 text-[10px] font-mono text-[#a3e635] hover:underline">View profile →</Link>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
