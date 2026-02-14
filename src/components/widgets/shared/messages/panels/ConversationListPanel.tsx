"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, Archive, Star, Clock, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

export function ConversationListPanel({
    selectedId,
    onSelect
}: {
    selectedId: string | null;
    onSelect: (id: string) => void;
}) {
    const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

    return (
        <div className="flex flex-col h-full bg-zinc-900/40 border-r border-zinc-800 backdrop-blur-md relative">
            {/* Search */}
            <div className="p-3 border-b border-zinc-800/50">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-[#a3e635] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#a3e635] transition-colors placeholder:text-zinc-600 font-mono"
                    />
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-800/50">
                <button
                    onClick={() => setFilter('all')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider transition-all border",
                        filter === 'all'
                            ? "bg-zinc-800 text-white border-zinc-700 shadow-sm"
                            : "text-zinc-500 border-transparent hover:bg-zinc-800/50 hover:text-zinc-300"
                    )}
                    title="All Messages"
                >
                    <Clock className="w-3 h-3" /> All
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider transition-all border",
                        filter === 'unread'
                            ? "bg-zinc-800 text-[#a3e635] border-zinc-700 shadow-sm"
                            : "text-zinc-500 border-transparent hover:bg-zinc-800/50 hover:text-zinc-300"
                    )}
                    title="Unread"
                >
                    <Star className="w-3 h-3" /> Unread
                </button>
                <button
                    onClick={() => setFilter('archived')}
                    className={cn(
                        "p-1.5 rounded-sm transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50",
                        filter === 'archived' && "text-white bg-zinc-800"
                    )}
                    title="Archived"
                >
                    <Archive className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-sm transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50">
                    <MoreVertical className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-16">
                {MOCK_CONVERSATIONS.filter(c => {
                    if (filter === 'unread') return c.unreadCount > 0;
                    if (filter === 'archived') return false;
                    return true;
                }).map(conversation => (
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
                                    {conversation.brand}
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
                        <p className={cn(
                            "text-[11px] line-clamp-1 transition-colors leading-relaxed",
                            conversation.unreadCount > 0 ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-500"
                        )}>
                            {conversation.message}
                        </p>
                    </div>
                ))}

                {filter === 'archived' && (
                    <div className="p-8 text-center text-zinc-600 text-xs font-mono">
                        NO_ARCHIVED_MESSAGES
                    </div>
                )}
            </div>

            {/* Sticky New Chat Button */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent pt-6 pointer-events-none">
                <button className="pointer-events-auto w-full flex items-center justify-center gap-2 py-2.5 bg-[#a3e635] hover:bg-[#a3e635]/90 text-black text-xs font-bold uppercase rounded-sm shadow-[0_0_15px_rgba(163,230,53,0.2)] hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all">
                    <Inbox className="w-3.5 h-3.5" /> Start_New_Chat
                </button>
            </div>
        </div>
    );
}
