"use client";

import { useState, useMemo } from "react";
import { Eye, X, Check, RefreshCw, PlayCircle, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PENDING_CONTENT, APPROVED_CONTENT, CAMPAIGNS_LIST } from "@/lib/brand-data";
import { toast } from "sonner";

export function ContentTab({ campaignId }: { campaignId: string }) {
    const [statusFilter, setStatusFilter] = useState("all");
    const [creatorFilter, setCreatorFilter] = useState("all");
    const [reviewTarget, setReviewTarget] = useState<string | null>(null);
    const [reviewNote, setReviewNote] = useState("");
    const campaign = CAMPAIGNS_LIST.find(c => c.id === campaignId);

    const allContent = useMemo(() => {
        const base = [...PENDING_CONTENT, ...APPROVED_CONTENT].filter(c => {
            if (!campaign?.name) return true;
            return c.campaign?.includes(campaign.name.split(' ')[0]) || c.campaign === campaign.name;
        });
        return base.map(c => ({
            ...c,
            status: 'approvedDate' in c ? 'approved' : 'pending' as const,
        }));
    }, [campaign]);

    const creators = [...new Set(allContent.map(c => c.creator))];
    const filtered = useMemo(() => {
        let list = allContent;
        if (statusFilter !== "all") list = list.filter(c => c.status === statusFilter);
        if (creatorFilter !== "all") list = list.filter(c => c.creator === creatorFilter);
        return list;
    }, [allContent, statusFilter, creatorFilter]);

    const reviewItem = reviewTarget ? allContent.find(c => c.id === reviewTarget) : null;

    const handleApprove = () => {
        if (!reviewItem) return;
        toast.success(`${reviewItem.creator}'s content approved`);
        setReviewTarget(null);
        setReviewNote("");
    };

    const handleRequestRevision = () => {
        if (!reviewItem) return;
        if (!reviewNote.trim()) {
            toast.error("Please add a note describing what needs changing.");
            return;
        }
        toast.success(`Revision requested from ${reviewItem.creator}`, { description: reviewNote });
        setReviewTarget(null);
        setReviewNote("");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
                <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase w-full">Submitted Content</h2>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">
                    <option value="all">Status: All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                </select>
                <select value={creatorFilter} onChange={e => setCreatorFilter(e.target.value)} className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">
                    <option value="all">Creator: All</option>
                    {creators.map(cr => <option key={cr} value={cr}>{cr}</option>)}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(c => (
                    <div key={c.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors">
                        <div className="aspect-video bg-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-600 gap-2">
                            {('type' in c && c.type === 'video') ? <PlayCircle className="w-6 h-6 text-zinc-600" /> : <ImageIcon className="w-6 h-6 text-zinc-600" />}
                            {('type' in c ? c.type : 'content')} preview
                        </div>
                        <div className="p-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-white">{c.creator}</span>
                                <span className={cn(
                                    "text-[9px] font-mono px-2 py-0.5 rounded-sm",
                                    'approvedDate' in c ? "bg-[#a3e635]/10 text-[#a3e635]" : "bg-amber-500/10 text-amber-400"
                                )}>
                                    {'approvedDate' in c ? 'Approved' : 'Pending'}
                                </span>
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 mb-2">{('submitted' in c ? c.submitted : null) || ('approvedDate' in c ? (c as { approvedDate: string }).approvedDate : '')}</div>
                            {'views' in c && <div className="text-[10px] font-mono text-[#a3e635] mb-2">{(c as { views: string }).views} views</div>}
                            <button
                                onClick={() => setReviewTarget(c.id)}
                                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635] flex items-center justify-center gap-1 transition-colors"
                            >
                                <Eye className="w-3 h-3" /> Review
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Review Modal */}
            {reviewTarget && reviewItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setReviewTarget(null); setReviewNote(""); }} />
                    <div className="relative z-10 w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase">Review Content</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{reviewItem.creator} — {reviewItem.campaign}</p>
                            </div>
                            <button onClick={() => { setReviewTarget(null); setReviewNote(""); }} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center">
                                {('type' in reviewItem && reviewItem.type === 'video')
                                    ? <PlayCircle className="w-12 h-12 text-zinc-600" />
                                    : <ImageIcon className="w-12 h-12 text-zinc-600" />
                                }
                            </div>
                            {'caption' in reviewItem && (
                                <p className="text-xs text-zinc-400 font-mono leading-relaxed">{(reviewItem as { caption: string }).caption}</p>
                            )}
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase">Feedback / revision notes</label>
                                <textarea
                                    value={reviewNote}
                                    onChange={e => setReviewNote(e.target.value)}
                                    placeholder="Add your feedback here (required for revision request)..."
                                    className="w-full h-20 bg-zinc-900 border border-zinc-800 rounded-sm p-2 text-xs text-white font-mono focus:border-[#a3e635] focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 px-6 py-4 border-t border-zinc-800">
                            <button
                                onClick={handleRequestRevision}
                                className="flex-1 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold font-mono uppercase rounded-sm hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-1.5"
                            >
                                <RefreshCw className="w-3.5 h-3.5" /> Request Revision
                            </button>
                            <button
                                onClick={handleApprove}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-[10px] font-mono uppercase rounded-sm hover:bg-[#bef264] transition-colors flex items-center justify-center gap-1.5"
                            >
                                <Check className="w-3.5 h-3.5" /> Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
