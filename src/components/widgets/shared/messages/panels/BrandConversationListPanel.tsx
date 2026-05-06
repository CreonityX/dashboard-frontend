"use client";

import { useState } from "react";
import { Search, MoreVertical, Archive, Star, Clock, Inbox, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

import { MOCK_BRAND_CONVERSATIONS, MOCK_CAMPAIGNS } from "@/lib/brand-data";

export function ConversationListPanel({
    selectedId,
    onSelect,
    onOpenBroadcast
}: {
    selectedId: string | null;
    onSelect: (id: string) => void;
    onOpenBroadcast?: () => void;
}) {
    const [filter, setFilter] = useState<'all' | 'creator' | 'campaign' | 'unread'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [campaignFilter, setCampaignFilter] = useState<string | null>(null);
    const [creatorFilter, setCreatorFilter] = useState<string | null>(null);

    const creators = [...new Set(MOCK_BRAND_CONVERSATIONS.filter(c => !c.isSupport).map(c => c.creator))].sort();
    const campaigns = MOCK_CAMPAIGNS;

    const filtered = MOCK_BRAND_CONVERSATIONS.filter(c => {
        if (filter === 'unread' && c.unreadCount === 0) return false;
        if (creatorFilter && c.creator !== creatorFilter) return false;
        if (campaignFilter && c.campaignId !== campaignFilter) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return c.creator.toLowerCase().includes(q) ||
                (c.campaign || "").toLowerCase().includes(q) ||
                c.message.toLowerCase().includes(q);
        }
        return true;
    });

    return (
        <div className="flex flex-col h-full bg-zinc-900/40 border-r border-zinc-800 backdrop-blur-md relative">
            {/* Search */}
            <div className="p-3 border-b border-zinc-800/50">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-[#a3e635] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#a3e635] transition-colors placeholder:text-zinc-600 font-mono"
                    />
                </div>
            </div>

            {/* Filters Row */}
            <div className="px-3 py-2 border-b border-zinc-800/50 space-y-2">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => { setFilter('all'); setCampaignFilter(null); setCreatorFilter(null); }}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider transition-all border",
                            filter === 'all' ? "bg-zinc-800 text-white border-zinc-700 shadow-sm" : "text-zinc-500 border-transparent hover:bg-zinc-800/50 hover:text-zinc-300"
                        )}
                    >
                        <Clock className="w-3 h-3" /> All
                    </button>
                    <button
                        onClick={() => { setFilter('unread'); setCampaignFilter(null); setCreatorFilter(null); }}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider transition-all border",
                            filter === 'unread' ? "bg-zinc-800 text-[#a3e635] border-zinc-700 shadow-sm" : "text-zinc-500 border-transparent hover:bg-zinc-800/50 hover:text-zinc-300"
                        )}
                    >
                        <Star className="w-3 h-3" /> Unread
                    </button>
                    <button className="p-1.5 rounded-sm transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50" title="Archived">
                        <Archive className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-sm transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50">
                        <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                </div>
                {/* Creator / Campaign dropdown filters */}
                <div className="flex gap-1.5">
                    <select
                        value={creatorFilter || ""}
                        onChange={(e) => setCreatorFilter(e.target.value || null)}
                        className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-sm py-1.5 px-2 text-[10px] text-zinc-400 focus:border-[#a3e635] focus:outline-none font-mono"
                    >
                        <option value="">All creators</option>
                        {creators.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                        value={campaignFilter || ""}
                        onChange={(e) => setCampaignFilter(e.target.value || null)}
                        className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-sm py-1.5 px-2 text-[10px] text-zinc-400 focus:border-[#a3e635] focus:outline-none font-mono"
                    >
                        <option value="">All campaigns</option>
                        {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-20">
                {filtered.map(conversation => (
                    <div
                        key={conversation.id}
                        onClick={() => onSelect(conversation.id)}
                        className={cn(
                            "p-3 mx-2 mt-2 rounded-sm border border-transparent cursor-pointer transition-all group relative",
                            selectedId === conversation.id
                                ? "bg-zinc-800 border-zinc-700 shadow-sm"
                                : "hover:bg-zinc-800/30 hover:border-zinc-800/50"
                        )}
                    >
                        <div className="flex justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "font-bold text-xs transition-colors",
                                    selectedId === conversation.id ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                )}>
                                    {conversation.creator}
                                </span>
                                {conversation.unreadCount > 0 && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                                )}
                            </div>
                            <span className={cn(
                                "text-[9px] font-mono",
                                conversation.unreadCount > 0 ? "text-[#a3e635]" : "text-zinc-600"
                            )}>
                                {conversation.time}
                            </span>
                        </div>
                        {conversation.campaign && (
                            <div className="text-[9px] text-zinc-500 font-mono mb-1 truncate">
                                {conversation.campaign}
                            </div>
                        )}
                        <p className={cn(
                            "text-[11px] line-clamp-1 transition-colors leading-relaxed",
                            conversation.unreadCount > 0 ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-500"
                        )}>
                            {conversation.message}
                        </p>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="p-8 text-center text-zinc-600 text-xs font-mono">
                        NO_CONVERSATIONS_FOUND
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent pt-6 pointer-events-none space-y-2">
                <div className="pointer-events-auto flex gap-2">
                    <button
                        onClick={onOpenBroadcast}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase rounded-sm border border-zinc-700 hover:border-[#a3e635]/50 transition-all"
                    >
                        <Megaphone className="w-3.5 h-3.5" /> Broadcast
                    </button>
                    <button
                        onClick={() => {}}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#a3e635] hover:bg-[#b5f045] text-black text-xs font-bold uppercase rounded-sm shadow-[0_0_15px_rgba(163,230,53,0.2)] hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all"
                    >
                        <Inbox className="w-3.5 h-3.5" /> New Chat
                    </button>
                </div>
            </div>
        </div>
    );
}
