"use client";

import { AlertTriangle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { REJECTED_CONTENT } from "@/lib/brand-data";

export function RejectedTab() {
    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Rejected_Content_Archive</h2>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-3 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase">
                    <div className="col-span-2">Creator</div>
                    <div className="col-span-2">Campaign</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-4">Reason Documented</div>
                    <div className="col-span-2">Payment Impact</div>
                </div>
                <div className="divide-y divide-zinc-800">
                    {REJECTED_CONTENT.map(r => (
                        <div key={r.id} className="grid grid-cols-12 px-4 py-4 items-center hover:bg-zinc-800/20">
                            <div className="col-span-2 flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-500/10 rounded-sm flex items-center justify-center">
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                                </div>
                                <span className="text-xs font-bold text-white">{r.creator}</span>
                            </div>
                            <div className="col-span-2 text-xs text-zinc-500 font-mono">{r.campaign}</div>
                            <div className="col-span-2 text-xs text-zinc-500 font-mono">{r.date}</div>
                            <div className="col-span-4 text-xs text-zinc-400">{r.reason}</div>
                            <div className="col-span-2 text-[10px] font-mono text-zinc-500">{r.paymentImpact}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
