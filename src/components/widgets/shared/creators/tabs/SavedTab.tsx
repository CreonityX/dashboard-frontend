"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, Mail, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { DISCOVER_CREATORS, SAVED_CREATORS, SAVED_CREATORS_LISTS } from "@/lib/brand-data";
import Link from "next/link";

export function SavedTab() {
    const [selectedList, setSelectedList] = useState<string | null>(null);
    const [bulkSelected, setBulkSelected] = useState<Set<string>>(new Set());

    const savedCreators = DISCOVER_CREATORS.filter(c => SAVED_CREATORS.includes(c.id));
    const listFiltered = selectedList
        ? savedCreators.filter(c => SAVED_CREATORS_LISTS.find(l => l.id === selectedList)?.creatorIds.includes(c.id))
        : savedCreators;

    const toggleBulk = (id: string) => setBulkSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    const selectAll = () => setBulkSelected(new Set(listFiltered.map(c => c.id)));
    const clearBulk = () => setBulkSelected(new Set());

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Saved_Creators</h2>
                <div className="flex gap-2">
                    <select value={selectedList || ""} onChange={e => setSelectedList(e.target.value || null)} className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">
                        <option value="">All saved</option>
                        {SAVED_CREATORS_LISTS.map(l => <option key={l.id} value={l.id}>{l.label} ({l.count})</option>)}
                    </select>
                    <button className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-400 rounded-sm hover:border-zinc-600">+ New list</button>
                </div>
            </div>

            <p className="text-[11px] text-zinc-500 font-mono">Bookmarked creators. Organize into lists and invite in bulk.</p>

            {(bulkSelected.size > 0 || listFiltered.length > 0) && (
                <div className="flex items-center gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-sm">
                    {bulkSelected.size > 0 ? (
                        <>
                            <span className="text-[10px] font-mono text-zinc-400">{bulkSelected.size} selected</span>
                            <button className="px-3 py-1.5 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/20">
                                Invite all to campaign
                            </button>
                            <button onClick={clearBulk} className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300">Clear</button>
                        </>
                    ) : (
                        <button onClick={selectAll} className="text-[10px] font-mono text-zinc-500 hover:text-[#a3e635]">Select all</button>
                    )}
                </div>
            )}

            <div className="space-y-3">
                {listFiltered.length === 0 ? (
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-8 text-center text-zinc-500 font-mono text-sm">No saved creators yet.</div>
                ) : (
                    listFiltered.map(creator => (
                        <div key={creator.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors">
                            <label className="cursor-pointer shrink-0">
                                <input type="checkbox" checked={bulkSelected.has(creator.id)} onChange={() => toggleBulk(creator.id)} className="rounded border-zinc-700" />
                            </label>
                            <div className="w-12 h-12 rounded-sm bg-zinc-800 flex items-center justify-center text-sm font-bold text-[#a3e635] shrink-0">{creator.name.substring(0, 2)}</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-white">{creator.name}</div>
                                <div className="text-[10px] text-zinc-500 font-mono">{creator.niche} • {creator.platforms.map(p => p.followers).join(", ")}</div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href={`/creators?tab=discover&creator=${creator.id}`} className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635]">View</Link>
                                <Link href={`/creators?tab=discover&creator=${creator.id}&invite=1`} className="px-3 py-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/20 flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> Invite
                                </Link>
                                <button className="p-2 border border-zinc-700 text-zinc-500 rounded-sm hover:border-zinc-600"><MoreVertical className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
