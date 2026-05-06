"use client";

import { useState } from "react";
import { Check, X, MessageSquare, GitCompare, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHORTLISTED_APPLICATIONS } from "@/lib/brand-data";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

export function ShortlistedTab() {
    const [compareSelected, setCompareSelected] = useState<Set<string>>(new Set());
    const [accepted, setAccepted] = useState<Set<string>>(new Set());
    const [rejected, setRejected] = useState<Set<string>>(new Set());
    const [rejectTarget, setRejectTarget] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [messageTarget, setMessageTarget] = useState<string | null>(null);
    const [messageText, setMessageText] = useState("");
    const [showCompare, setShowCompare] = useState(false);

    const visible = SHORTLISTED_APPLICATIONS.filter(a => !accepted.has(a.id) && !rejected.has(a.id));

    const toggleCompare = (id: string) => {
        setCompareSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else if (next.size < 5) next.add(id);
            return next;
        });
    };

    const handleAccept = (id: string) => {
        const app = SHORTLISTED_APPLICATIONS.find(a => a.id === id);
        setAccepted(prev => new Set([...prev, id]));
        setCompareSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
        toast.success(`${app?.creator} accepted`, { description: "They've been notified and added to the campaign." });
    };

    const handleReject = () => {
        if (!rejectTarget) return;
        const app = SHORTLISTED_APPLICATIONS.find(a => a.id === rejectTarget);
        setRejected(prev => new Set([...prev, rejectTarget]));
        setCompareSelected(prev => { const n = new Set(prev); n.delete(rejectTarget); return n; });
        toast(`${app?.creator} removed from shortlist`, { description: rejectReason || "No feedback provided." });
        setRejectTarget(null);
        setRejectReason("");
    };

    const handleMessage = () => {
        if (!messageTarget || !messageText.trim()) return;
        const app = SHORTLISTED_APPLICATIONS.find(a => a.id === messageTarget);
        toast.success(`Message sent to ${app?.creator}`);
        setMessageTarget(null);
        setMessageText("");
    };

    const compareItems = SHORTLISTED_APPLICATIONS.filter(a => compareSelected.has(a.id));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Shortlisted_Creators</h2>
                {compareSelected.size >= 2 && (
                    <button onClick={() => setShowCompare(true)} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635] transition-colors">
                        <GitCompare className="w-4 h-4" /> Compare Side-by-Side ({compareSelected.size})
                    </button>
                )}
            </div>

            <p className="text-[11px] text-zinc-500 font-mono">Creators you're considering. Select up to 5 to compare side-by-side.</p>

            {visible.length === 0 && (
                <div className="text-center py-16 text-zinc-600 font-mono text-xs">All shortlisted creators have been processed.</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map(app => (
                    <div key={app.id} className={cn("bg-zinc-900/40 border rounded-sm p-4 transition-colors", compareSelected.has(app.id) ? "border-[#a3e635]/50" : "border-zinc-800 hover:border-zinc-700")}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-sm bg-zinc-800 flex items-center justify-center text-xs font-bold text-[#a3e635]">{app.creator.substring(0, 2)}</div>
                                <div>
                                    <div className="text-sm font-bold text-white">{app.creator}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">{app.niche} • {app.matchScore}% match</div>
                                </div>
                            </div>
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" checked={compareSelected.has(app.id)} onChange={() => toggleCompare(app.id)} className="rounded border-zinc-600" />
                                <span className="text-[9px] font-mono text-zinc-500">Compare</span>
                            </label>
                        </div>
                        <div className="text-[10px] text-zinc-600 font-mono mb-3">{app.campaign} • ${app.rate?.toLocaleString()}</div>
                        <div className="flex gap-2">
                            <button onClick={() => handleAccept(app.id)} className="flex-1 py-1.5 bg-[#a3e635] text-black text-[10px] font-bold font-mono rounded-sm hover:bg-[#b0f545] transition-colors flex items-center justify-center gap-1">
                                <Check className="w-3 h-3" /> Accept
                            </button>
                            <button onClick={() => setRejectTarget(app.id)} className="flex-1 py-1.5 border border-red-500/30 text-red-400 text-[10px] font-mono rounded-sm hover:bg-red-500/10 transition-colors flex items-center justify-center gap-1">
                                <X className="w-3 h-3" /> Reject
                            </button>
                            <button onClick={() => setMessageTarget(app.id)} className="py-1.5 px-2 border border-zinc-700 text-zinc-400 rounded-sm hover:border-zinc-500 hover:text-white transition-colors">
                                <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Compare Modal */}
            {showCompare && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCompare(false)} />
                    <div className="relative z-10 w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 sticky top-0 bg-zinc-950 z-10">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Compare Creators</h3>
                            <button onClick={() => setShowCompare(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr>
                                        <th className="text-left p-3 text-zinc-500 font-mono uppercase text-[10px] w-32">Metric</th>
                                        {compareItems.map(c => (
                                            <th key={c.id} className="p-3 text-center">
                                                <div className="text-sm font-bold text-white">{c.creator}</div>
                                                <div className="text-[10px] text-zinc-500 font-mono">{c.niche}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {[
                                        { label: "Match Score", key: "matchScore", fmt: (v: any) => `${v}%`, highlight: true },
                                        { label: "Followers", key: "followers", fmt: (v: any) => v },
                                        { label: "Engagement", key: "engagement", fmt: (v: any) => `${v}%` },
                                        { label: "Rate", key: "rate", fmt: (v: any) => `$${v?.toLocaleString()}` },
                                        { label: "Campaign", key: "campaign", fmt: (v: any) => v },
                                    ].map(row => (
                                        <tr key={row.label} className="hover:bg-zinc-900/30">
                                            <td className="p-3 text-zinc-500 font-mono text-[10px] uppercase">{row.label}</td>
                                            {compareItems.map(c => (
                                                <td key={c.id} className={cn("p-3 text-center font-mono", row.highlight ? "text-[#a3e635] font-bold" : "text-zinc-300")}>
                                                    {row.fmt((c as any)[row.key])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-zinc-800 flex justify-end gap-2">
                            {compareItems.map(c => (
                                <button key={c.id} onClick={() => { handleAccept(c.id); setShowCompare(false); }} className="px-4 py-2 bg-[#a3e635] text-black text-xs font-bold rounded-sm hover:bg-[#b0f545] transition-colors">
                                    Accept {c.creator}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {rejectTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setRejectTarget(null); setRejectReason(""); }} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Remove from Shortlist</h3>
                            <button onClick={() => { setRejectTarget(null); setRejectReason(""); }} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="Reason (optional)..."
                                className="w-full h-20 bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-red-500/40 resize-none" />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { setRejectTarget(null); setRejectReason(""); }} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleReject} className="flex-1 py-2 bg-red-600 text-white font-bold text-xs uppercase rounded-sm hover:bg-red-500 transition-colors">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Message Modal */}
            {messageTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMessageTarget(null)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Send Message</h3>
                            <button onClick={() => setMessageTarget(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5">
                            <textarea value={messageText} onChange={e => setMessageText(e.target.value)} placeholder="Type your message..." autoFocus
                                className="w-full h-28 bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635]/50 resize-none" />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setMessageTarget(null)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleMessage} disabled={!messageText.trim()} className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                                <Send className="w-3.5 h-3.5" /> Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
