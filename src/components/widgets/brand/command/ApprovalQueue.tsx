"use client";

import { Check, X, FileText, ExternalLink, RefreshCw } from "lucide-react";

export function ApprovalQueue() {
    const items = [
        { id: 1, creator: "Kai_Zen", asset: "vlog_final_v2.mp4", submitted: "2h ago", status: "pending" },
        { id: 2, creator: "NeonDreamer", asset: "social_posts.zip", submitted: "5h ago", status: "pending" },
        { id: 3, creator: "TechFlux", asset: "review_draft.pdf", submitted: "1d ago", status: "revision" },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 pb-2">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">APPROVAL_QUEUE</h3>
                <div className="text-[10px] font-mono text-[#a3e635] flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#a3e635] rounded-full animate-pulse" /> 2 PENDING
                </div>
            </div>

            <div className="flex-1 overflow-auto px-6 pb-6 space-y-3">
                {items.map((item) => (
                    <div key={item.id} className="group bg-zinc-900/30 border border-zinc-800 p-3 rounded-sm hover:bg-zinc-900/60 transition-colors flex items-center gap-3">
                        {/* Type Icon */}
                        <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center border border-white/5">
                            <FileText className="w-4 h-4 text-zinc-400" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                                <span className="text-xs font-bold text-white font-mono truncate">{item.creator}</span>
                                <span className="text-[9px] text-zinc-600 font-mono">{item.submitted}</span>
                            </div>
                            <div className="text-[10px] text-zinc-400 truncate flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors">
                                {item.asset} <ExternalLink className="w-2 h-2 opacity-0 group-hover:opacity-100 placeholder:transition-opacity" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-[2px]" title="Request Revision">
                                <RefreshCw className="w-3 h-3" />
                            </button>
                            <button className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-[2px]" title="Reject">
                                <X className="w-3 h-3" />
                            </button>
                            <button className="p-1.5 bg-[#a3e635]/10 hover:bg-[#a3e635]/20 text-[#a3e635] border border-[#a3e635]/20 rounded-[2px]" title="Approve">
                                <Check className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}

                <button className="w-full py-2 border border-dashed border-zinc-800 text-zinc-600 text-[10px] font-mono hover:text-zinc-400 hover:border-zinc-700 transition-colors rounded-sm">
                    LOAD_ARCHIVED_SUBMISSIONS
                </button>
            </div>
        </div>
    );
}
