"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    PENDING_APPLICATIONS,
    SHORTLISTED_APPLICATIONS,
    ACCEPTED_APPLICATIONS,
    REJECTED_APPLICATIONS
} from "@/lib/brand-data";

const ALL_ARCHIVE = [
    ...PENDING_APPLICATIONS.map(a => ({ id: a.id, creator: a.creator, campaign: a.campaign, appliedDate: a.appliedDate, matchScore: a.matchScore, status: 'pending' as const })),
    ...SHORTLISTED_APPLICATIONS.map(a => ({ id: a.id, creator: a.creator, campaign: a.campaign, appliedDate: a.appliedDate, matchScore: a.matchScore, status: 'shortlisted' as const })),
    ...ACCEPTED_APPLICATIONS.map(a => ({ id: a.id, creator: a.creator, campaign: a.campaign, appliedDate: a.appliedDate, matchScore: null, status: 'accepted' as const })),
    ...REJECTED_APPLICATIONS.map(a => ({ id: a.id, creator: a.creator, campaign: a.campaign, rejectedDate: a.rejectedDate, matchScore: null, status: 'rejected' as const })),
];

export function ArchiveTab() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [campaignFilter, setCampaignFilter] = useState("");

    const filtered = ALL_ARCHIVE.filter(a => {
        if (search && !a.creator.toLowerCase().includes(search.toLowerCase()) && !(a.campaign || '').toLowerCase().includes(search.toLowerCase())) return false;
        if (statusFilter && a.status !== statusFilter) return false;
        if (campaignFilter && a.campaign !== campaignFilter) return false;
        return true;
    });

    const campaigns = [...new Set(ALL_ARCHIVE.map(a => a.campaign).filter(Boolean))] as string[];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">All_Applications_Archive</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635]">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            <div className="flex flex-wrap gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Search by creator, campaign..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 pr-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-white font-mono w-56 focus:outline-none focus:border-[#a3e635]"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono"
                >
                    <option value="">Status: All</option>
                    <option value="pending">Pending</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                <select
                    value={campaignFilter}
                    onChange={(e) => setCampaignFilter(e.target.value)}
                    className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono"
                >
                    <option value="">Campaign: All</option>
                    {campaigns.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-3 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase">
                    <div className="col-span-3">Creator</div>
                    <div className="col-span-3">Campaign</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Match</div>
                </div>
                <div className="divide-y divide-zinc-800 max-h-96 overflow-y-auto">
                    {filtered.map((a, i) => (
                        <div key={a.id || i} className="grid grid-cols-12 px-4 py-3 items-center hover:bg-zinc-800/20">
                            <div className="col-span-3 text-xs font-bold text-white">{a.creator}</div>
                            <div className="col-span-3 text-xs text-zinc-500 font-mono">{a.campaign || '—'}</div>
                            <div className="col-span-2 text-[10px] font-mono text-zinc-600">{('appliedDate' in a ? a.appliedDate : null) || ('rejectedDate' in a ? a.rejectedDate : null)}</div>
                            <div className="col-span-2">
                                <span className={cn(
                                    "text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase",
                                    a.status === 'accepted' && "bg-[#a3e635]/10 text-[#a3e635]",
                                    a.status === 'shortlisted' && "bg-blue-500/10 text-blue-400",
                                    a.status === 'rejected' && "bg-red-500/10 text-red-400",
                                    a.status === 'pending' && "bg-zinc-800 text-zinc-400"
                                )}>
                                    {a.status}
                                </span>
                            </div>
                            <div className="col-span-2 text-right">
                                {a.matchScore ? <span className="text-xs font-mono text-[#a3e635]">{a.matchScore}%</span> : '—'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
