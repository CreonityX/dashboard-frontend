"use client";

import { Send, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { REVISION_REQUESTS } from "@/lib/brand-data";

function daysUntil(d: string) {
    const diff = new Date(d).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
}

export function RevisionsTab() {
    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Revision_Requests_Sent</h2>

            <div className="space-y-3">
                {REVISION_REQUESTS.map(r => {
                    const days = daysUntil(r.dueDate);
                    return (
                        <div key={r.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 hover:border-zinc-700 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-white">{r.creator}</span>
                                        <span className="text-[10px] text-zinc-500 font-mono">• {r.campaign}</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 mb-2">{r.feedback}</p>
                                    <div className="flex flex-wrap gap-3 text-[10px] font-mono text-zinc-600">
                                        <span>Requested: {r.requested}</span>
                                        <span>Due: {r.dueDate}</span>
                                        <span className={cn(
                                            days <= 0 ? "text-red-500" : days <= 2 ? "text-amber-500" : "text-[#a3e635]"
                                        )}>
                                            {days <= 0 ? "Overdue" : `${days}d left`}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button className="p-2 border border-zinc-700 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800" title="Follow up">
                                        <MessageSquare className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-zinc-800/50 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-zinc-600" />
                                <span className="text-[9px] font-mono text-zinc-600 uppercase">Deadline countdown active</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
