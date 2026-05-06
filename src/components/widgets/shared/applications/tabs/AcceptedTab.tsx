"use client";

import { CheckCircle, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_APPLICATIONS } from "@/lib/brand-data";

export function AcceptedTab() {
    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Accepted_Creators</h2>
            <p className="text-[11px] text-zinc-500 font-mono">Creators you've hired. Contract/brief sent automatically. Transitions to active when creator accepts.</p>

            <div className="space-y-3">
                {ACCEPTED_APPLICATIONS.map(app => (
                    <div key={app.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex items-center justify-between hover:border-zinc-700">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-sm bg-[#a3e635]/10 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-[#a3e635]" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">{app.creator}</div>
                                <div className="text-[10px] text-zinc-500 font-mono">{app.campaign}</div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-sm">
                                <Clock className="w-3 h-3 text-amber-500" />
                                <span className="text-[10px] font-mono text-amber-400 uppercase">Awaiting Creator Acceptance</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 border border-zinc-700 rounded-sm text-zinc-400 hover:text-white" title="View contract">
                                <FileText className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
