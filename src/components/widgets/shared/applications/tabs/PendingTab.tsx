"use client";

import { useState } from "react";
import { Search, Check, X, MessageSquare, ExternalLink, Instagram, Youtube, Users, TrendingUp, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { PENDING_APPLICATIONS } from "@/lib/brand-data";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

type AppStatus = "pending" | "accepted" | "rejected" | "interview";

export function PendingTab() {
    const [campaignFilter, setCampaignFilter] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "score" | "quality">("score");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [statuses, setStatuses] = useState<Record<string, AppStatus>>({});
    const [rejectTarget, setRejectTarget] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [interviewTarget, setInterviewTarget] = useState<string | null>(null);
    const [interviewDate, setInterviewDate] = useState("");
    const [interviewNote, setInterviewNote] = useState("");
    const [messageTarget, setMessageTarget] = useState<string | null>(null);
    const [messageText, setMessageText] = useState("");

    const campaigns = [...new Set(PENDING_APPLICATIONS.map(a => a.campaign))];
    const filtered = [...PENDING_APPLICATIONS]
        .filter(a => !campaignFilter || a.campaign === campaignFilter)
        .filter(a => !statuses[a.id] || statuses[a.id] === "pending")
        .sort((a, b) => {
            if (sortBy === "date") return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
            if (sortBy === "score") return b.matchScore - a.matchScore;
            return b.engagement - a.engagement;
        });

    const selected = selectedId ? PENDING_APPLICATIONS.find(a => a.id === selectedId) : null;

    const handleAccept = (id: string, name: string) => {
        setStatuses(prev => ({ ...prev, [id]: "accepted" }));
        setSelectedId(null);
        toast.success(`${name} accepted`, { description: "They have been notified and added to your campaign." });
    };

    const handleReject = () => {
        if (!rejectTarget) return;
        const app = PENDING_APPLICATIONS.find(a => a.id === rejectTarget);
        setStatuses(prev => ({ ...prev, [rejectTarget]: "rejected" }));
        setSelectedId(null);
        toast(`${app?.creator} application declined`, { description: rejectReason || "No feedback provided." });
        setRejectTarget(null);
        setRejectReason("");
    };

    const handleInterview = () => {
        if (!interviewTarget) return;
        const app = PENDING_APPLICATIONS.find(a => a.id === interviewTarget);
        setStatuses(prev => ({ ...prev, [interviewTarget]: "interview" }));
        setSelectedId(null);
        toast.success(`Interview requested with ${app?.creator}`, { description: interviewDate ? `Proposed date: ${interviewDate}` : "They'll be notified to confirm." });
        setInterviewTarget(null);
        setInterviewDate("");
        setInterviewNote("");
    };

    const handleMessage = () => {
        if (!messageTarget || !messageText.trim()) return;
        const app = PENDING_APPLICATIONS.find(a => a.id === messageTarget);
        toast.success(`Message sent to ${app?.creator}`);
        setMessageTarget(null);
        setMessageText("");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
                <select value={campaignFilter} onChange={e => setCampaignFilter(e.target.value)}
                    className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">
                    <option value="">All Campaigns</option>
                    {campaigns.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                    className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">
                    <option value="score">Sort: Match Score</option>
                    <option value="date">Sort: Application Date</option>
                    <option value="quality">Sort: Engagement</option>
                </select>
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-zinc-600 font-mono text-xs">No pending applications.</div>
            )}

            {!selected ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map(app => (
                        <div key={app.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors">
                            <div className="p-4">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-sm bg-zinc-800 flex items-center justify-center text-sm font-bold text-[#a3e635] shrink-0">{app.creator.substring(0, 2)}</div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-bold text-white">{app.creator}</div>
                                        <div className="text-[10px] text-zinc-500 font-mono">{app.niche}</div>
                                        <div className="flex gap-2 mt-1">
                                            {app.platforms.map(p => p === 'YouTube' ? <Youtube key={p} className="w-3 h-3 text-zinc-600" /> : <Instagram key={p} className="w-3 h-3 text-zinc-600" />)}
                                        </div>
                                    </div>
                                    <div className={cn("text-xs font-bold font-mono px-2 py-0.5 rounded-sm", app.matchScore >= 90 ? "bg-[#a3e635]/10 text-[#a3e635]" : app.matchScore >= 75 ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-400")}>
                                        {app.matchScore}%
                                    </div>
                                </div>
                                <div className="flex gap-4 text-[10px] font-mono text-zinc-500 mb-2">
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {app.followers}</span>
                                    <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {app.engagement}% eng</span>
                                </div>
                                <div className="text-[10px] text-zinc-600 font-mono mb-2">Applied {app.appliedDate} • {app.campaign}</div>
                                <p className="text-[11px] text-zinc-400 line-clamp-2 mb-3">{app.proposal}</p>
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={() => setSelectedId(app.id)} className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635] flex items-center gap-1">
                                        <ExternalLink className="w-3 h-3" /> View Full
                                    </button>
                                    <button onClick={() => handleAccept(app.id, app.creator)} className="px-2 py-1 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/20 flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Accept
                                    </button>
                                    <button onClick={() => setRejectTarget(app.id)} className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-400 rounded-sm hover:bg-red-500/20 flex items-center gap-1">
                                        <X className="w-3 h-3" /> Reject
                                    </button>
                                    <button onClick={() => setMessageTarget(app.id)} className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-zinc-600 flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" /> Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-sm">
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-start">
                                <h2 className="text-sm font-bold text-white font-display uppercase">Full_Application</h2>
                                <button onClick={() => setSelectedId(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors"><X className="w-4 h-4" /></button>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-sm bg-zinc-800 flex items-center justify-center text-lg font-bold text-[#a3e635]">{selected.creator.substring(0, 2)}</div>
                                <div>
                                    <div className="text-lg font-bold text-white">{selected.creator}</div>
                                    <div className="text-xs text-zinc-500 font-mono">{selected.niche}</div>
                                    <div className="text-[10px] text-zinc-600 mt-1">{selected.followers} • {selected.engagement}% eng</div>
                                </div>
                                <div className="ml-auto text-2xl font-bold text-[#a3e635]">{selected.matchScore}%</div>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Proposal / Pitch</h3>
                                <p className="text-sm text-zinc-300">{selected.proposal}</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Past Work Examples</h3>
                                <ul className="text-sm text-zinc-400 space-y-1">{selected.pastWork?.map((w, i) => <li key={i}>• {w}</li>)}</ul>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Rate Quote</div>
                                    <div className="text-lg font-bold text-[#a3e635]">${selected.rate?.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Availability</div>
                                    <div className="text-sm text-zinc-400">{selected.availability}</div>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-4 border-t border-zinc-800">
                                <button onClick={() => handleAccept(selected.id, selected.creator)} className="flex-1 py-2.5 bg-[#a3e635] text-black text-xs font-bold font-mono uppercase rounded-sm hover:bg-[#b0f545] transition-colors">Accept</button>
                                <button onClick={() => { setSelectedId(null); setInterviewTarget(selected.id); }} className="px-4 py-2.5 border border-amber-500/40 text-amber-400 text-xs font-mono rounded-sm hover:bg-amber-500/10 transition-colors">Request Interview</button>
                                <button onClick={() => { setSelectedId(null); setRejectTarget(selected.id); }} className="px-4 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-sm hover:bg-red-500/20 transition-colors">Reject</button>
                            </div>
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
                            <h3 className="text-sm font-bold text-white font-display uppercase">Reject Application</h3>
                            <button onClick={() => { setRejectTarget(null); setRejectReason(""); }} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <p className="text-xs text-zinc-400 font-mono">Provide optional feedback to help the creator improve future applications.</p>
                            <textarea
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                placeholder="Reason for rejection (optional)..."
                                className="w-full h-24 bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-red-500/40 resize-none"
                            />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { setRejectTarget(null); setRejectReason(""); }} className="flex-1 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleReject} className="flex-1 py-2 bg-red-600 text-white font-bold text-xs uppercase rounded-sm hover:bg-red-500 transition-colors">Confirm Reject</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Interview Modal */}
            {interviewTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setInterviewTarget(null)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Request Interview</h3>
                            <button onClick={() => setInterviewTarget(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 uppercase">Proposed Date & Time</label>
                                <input type="datetime-local" value={interviewDate} onChange={e => setInterviewDate(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#a3e635]/50 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 uppercase">Note to Creator (optional)</label>
                                <textarea value={interviewNote} onChange={e => setInterviewNote(e.target.value)} placeholder="What will you discuss?"
                                    className="w-full h-20 bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635]/50 resize-none" />
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setInterviewTarget(null)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleInterview} className="flex-1 py-2 bg-amber-500 text-black font-bold text-xs uppercase rounded-sm hover:bg-amber-400 transition-colors">Send Request</button>
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
                                className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635]/50 resize-none" />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setMessageTarget(null)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
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
