"use client";

import { useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { REJECTED_APPLICATIONS } from "@/lib/brand-data";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

export function RejectedTab() {
    const [reconsidered, setReconsidered] = useState<Set<string>>(new Set());
    const [reconsiderTarget, setReconsiderTarget] = useState<string | null>(null);

    const visible = REJECTED_APPLICATIONS.filter(a => !reconsidered.has(a.id));

    const handleReconsider = () => {
        if (!reconsiderTarget) return;
        const app = REJECTED_APPLICATIONS.find(a => a.id === reconsiderTarget);
        setReconsidered(prev => new Set([...prev, reconsiderTarget]));
        toast.success(`${app?.creator} moved back to pending`, { description: "Their application is now in the pending review queue." });
        setReconsiderTarget(null);
    };

    const app = reconsiderTarget ? REJECTED_APPLICATIONS.find(a => a.id === reconsiderTarget) : null;

    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Rejected_Archive</h2>
            <p className="text-[11px] text-zinc-500 font-mono">Declined applications with rejection reasons. You can reconsider any application.</p>

            {visible.length === 0 && (
                <div className="text-center py-16 text-zinc-600 font-mono text-xs">No rejected applications.</div>
            )}

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="divide-y divide-zinc-800">
                    {visible.map(app => (
                        <div key={app.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/20 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-sm bg-red-500/10 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{app.creator}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">{app.campaign}</div>
                                    <div className="text-[11px] text-zinc-600 mt-1">{app.reason}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[10px] font-mono text-zinc-600 hidden sm:block">{app.rejectedDate}</span>
                                <button
                                    onClick={() => setReconsiderTarget(app.id)}
                                    className="flex items-center gap-1 px-3 py-1.5 border border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-[#a3e635] hover:border-[#a3e635]/30 transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" /> Reconsider
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmModal
                open={!!reconsiderTarget}
                onClose={() => setReconsiderTarget(null)}
                onConfirm={handleReconsider}
                title="Reconsider Application"
                description={`Move ${app?.creator}'s application back to the Pending Review queue? You can review and make a new decision.`}
                confirmLabel="Yes, Reconsider"
            />
        </div>
    );
}
