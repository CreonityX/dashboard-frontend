"use client";

import { useState } from "react";
import {
    Search, ChevronLeft, ZoomIn, ZoomOut, MessageSquare, UserPlus, Check, RefreshCw, X, Save,
    PlayCircle, Image as ImageIcon, Send, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    PENDING_CONTENT,
    MOCK_CAMPAIGNS,
    CAMPAIGN_BRIEF,
} from "@/lib/brand-data";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

const TEAM_MEMBERS = ["Alex Rivera", "Jordan Kim", "Sam Chen", "Taylor Moss"];

export function QueueTab() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [campaignFilter, setCampaignFilter] = useState("");
    const [creatorFilter, setCreatorFilter] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "deadline">("deadline");
    const [showRevisionForm, setShowRevisionForm] = useState(false);
    const [zoom, setZoom] = useState(100);
    const [processedIds, setProcessedIds] = useState<Set<string>>(new Set());
    const [savedDraftIds, setSavedDraftIds] = useState<Set<string>>(new Set());
    const [revisionText, setRevisionText] = useState("");
    const [revisionRef, setRevisionRef] = useState("");
    const [revisionDue, setRevisionDue] = useState("");
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [commentText, setCommentText] = useState("");
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [taggedMembers, setTaggedMembers] = useState<Set<string>>(new Set());
    const [tagNote, setTagNote] = useState("");

    const creators = [...new Set(PENDING_CONTENT.map(c => c.creator))];

    const filtered = [...PENDING_CONTENT]
        .filter(c => {
            if (processedIds.has(c.id)) return false;
            if (campaignFilter && c.campaign !== campaignFilter) return false;
            if (creatorFilter && c.creator !== creatorFilter) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            return new Date(b.submitted).getTime() - new Date(a.submitted).getTime();
        });

    const selected = selectedId ? PENDING_CONTENT.find(c => c.id === selectedId) : null;

    const handleApprove = () => {
        if (!selectedId || !selected) return;
        setProcessedIds(prev => new Set([...prev, selectedId]));
        toast.success(`${selected.creator}'s content approved`, {
            description: "Creator has been notified. Content moves to the approved queue.",
        });
        setSelectedId(null);
    };

    const handleReject = () => {
        if (!selectedId || !selected) return;
        setProcessedIds(prev => new Set([...prev, selectedId]));
        toast(`${selected.creator}'s content rejected`, {
            description: rejectReason || "No reason provided.",
        });
        setShowRejectModal(false);
        setRejectReason("");
        setSelectedId(null);
    };

    const handleRequestRevisions = () => {
        if (!revisionText.trim()) {
            toast.error("Please describe what needs changing.");
            return;
        }
        if (!selectedId || !selected) return;
        setProcessedIds(prev => new Set([...prev, selectedId]));
        toast.success(`Revision request sent to ${selected.creator}`, {
            description: revisionDue ? `Due by ${revisionDue}` : "No deadline set.",
        });
        setShowRevisionForm(false);
        setRevisionText("");
        setRevisionRef("");
        setRevisionDue("");
        setSelectedId(null);
    };

    const handleSaveDraft = () => {
        if (!selectedId || !selected) return;
        setSavedDraftIds(prev => new Set([...prev, selectedId]));
        toast.success("Review saved as draft", {
            description: "You can return to this content later.",
        });
    };

    const handleSendComment = () => {
        if (!commentText.trim()) return;
        toast.success("Comment posted", { description: commentText });
        setCommentText("");
        setShowCommentBox(false);
    };

    const handleTagTeam = () => {
        if (taggedMembers.size === 0) {
            toast.error("Select at least one team member.");
            return;
        }
        const names = [...taggedMembers].join(", ");
        toast.success(`Tagged ${names}`, {
            description: tagNote || "No note added.",
        });
        setShowTagModal(false);
        setTaggedMembers(new Set());
        setTagNote("");
    };

    return (
        <div className="space-y-6">
            {!selected ? (
                <>
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-white font-mono w-48 focus:outline-none focus:border-[#a3e635]"
                            />
                        </div>
                        <select
                            value={campaignFilter}
                            onChange={(e) => setCampaignFilter(e.target.value)}
                            className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono"
                        >
                            <option value="">All Campaigns</option>
                            {MOCK_CAMPAIGNS.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                        <select
                            value={creatorFilter}
                            onChange={(e) => setCreatorFilter(e.target.value)}
                            className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono"
                        >
                            <option value="">All Creators</option>
                            {creators.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as "date" | "deadline")}
                            className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono"
                        >
                            <option value="deadline">Sort: Deadline Urgency</option>
                            <option value="date">Sort: Submission Date</option>
                        </select>
                    </div>

                    {/* Queue List */}
                    <div className="space-y-2">
                        {filtered.length === 0 && (
                            <div className="text-center py-16 text-zinc-600 font-mono text-xs">No content pending review.</div>
                        )}
                        {filtered.map(item => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedId(item.id)}
                                className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-800 rounded-sm hover:border-zinc-700 cursor-pointer transition-colors group"
                            >
                                <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center shrink-0">
                                    {item.type === "video" ? <PlayCircle className="w-4 h-4 text-zinc-500" /> : <ImageIcon className="w-4 h-4 text-zinc-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-white">{item.creator}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">{item.campaign} • {item.platform}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {savedDraftIds.has(item.id) && (
                                        <span className="text-[9px] font-mono text-amber-400 uppercase border border-amber-500/30 px-2 py-0.5 rounded-sm">Draft</span>
                                    )}
                                    <div className="text-[10px] text-zinc-600 font-mono shrink-0">
                                        Submitted {item.submitted} • Due {item.deadline}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* Review Interface */
                <div className="space-y-4">
                    <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-white">
                        <ChevronLeft className="w-4 h-4" /> Back to Queue
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Content Preview Pane */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                                <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex justify-between items-center">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Content Preview</span>
                                    <div className="flex gap-1">
                                        <button onClick={() => setZoom(z => Math.max(50, z - 25))} className="p-1.5 hover:bg-zinc-800 rounded-sm"><ZoomOut className="w-3.5 h-3.5" /></button>
                                        <span className="text-[10px] font-mono text-zinc-500 px-2">{zoom}%</span>
                                        <button onClick={() => setZoom(z => Math.min(200, z + 25))} className="p-1.5 hover:bg-zinc-800 rounded-sm"><ZoomIn className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col items-center bg-zinc-950/50">
                                    <div
                                        className="w-full aspect-video max-w-lg bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center overflow-hidden"
                                        style={{ transform: `scale(${zoom / 100})` }}
                                    >
                                        {selected?.type === "video" ? (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                                <PlayCircle className="w-16 h-16 text-zinc-600" />
                                                <span className="text-[10px] font-mono text-zinc-600 ml-2">VIDEO_PREVIEW</span>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                                <ImageIcon className="w-12 h-12 text-zinc-600" />
                                                <span className="text-[10px] font-mono text-zinc-600 ml-2">IMAGE_PREVIEW</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 text-[9px] font-mono text-zinc-500 uppercase w-full max-w-lg">
                                        Platform: {selected?.platform}
                                    </div>
                                </div>
                                <div className="p-4 border-t border-zinc-800 space-y-2">
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Caption</div>
                                    <p className="text-xs text-zinc-300">{selected?.caption}</p>
                                    <div className="text-[10px] font-mono text-zinc-500">#{selected?.hashtags?.replace(/#/g, " #")}</div>
                                </div>
                                {/* Revision History */}
                                {selected && selected.versions && selected.versions.length > 1 && (
                                    <div className="p-4 border-t border-zinc-800">
                                        <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Revision_History</div>
                                        <div className="flex gap-2">
                                            {selected.versions.map((v) => (
                                                <button key={v} className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-[#a3e635] hover:border-[#a3e635]/30">
                                                    {v.toUpperCase()}
                                                </button>
                                            ))}
                                            <button className="px-3 py-1.5 border border-dashed border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-500 hover:border-zinc-600">
                                                Compare
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Review Tools */}
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => setShowCommentBox(!showCommentBox)}
                                    className={cn("flex items-center gap-2 px-3 py-2 border rounded-sm text-[10px] font-mono transition-colors", showCommentBox ? "bg-zinc-800 border-[#a3e635]/40 text-[#a3e635]" : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-[#a3e635]/30")}
                                >
                                    <MessageSquare className="w-3.5 h-3.5" /> Comment
                                </button>
                                <button
                                    onClick={() => setShowTagModal(true)}
                                    className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 border border-zinc-800 rounded-sm text-[10px] font-mono text-zinc-400 hover:border-[#a3e635]/30 transition-colors"
                                >
                                    <UserPlus className="w-3.5 h-3.5" /> Tag Team
                                </button>
                                <button
                                    onClick={() => toast("Annotation mode coming soon", { description: "Markup tools are in development." })}
                                    className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 border border-zinc-800 rounded-sm text-[10px] font-mono text-zinc-400 hover:border-zinc-700 transition-colors"
                                >
                                    Annotation (markup)
                                </button>
                            </div>

                            {/* Comment Box */}
                            {showCommentBox && (
                                <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 space-y-3">
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Add Comment</div>
                                    <textarea
                                        autoFocus
                                        value={commentText}
                                        onChange={e => setCommentText(e.target.value)}
                                        placeholder="Write your comment..."
                                        className="w-full h-20 bg-zinc-950 border border-zinc-800 rounded-sm p-2 text-xs text-white focus:border-[#a3e635] focus:outline-none resize-none"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => { setShowCommentBox(false); setCommentText(""); }} className="px-3 py-1.5 border border-zinc-700 text-zinc-400 text-[10px] font-mono rounded-sm hover:text-white transition-colors">
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSendComment}
                                            disabled={!commentText.trim()}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#a3e635] text-black text-[10px] font-bold font-mono rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors"
                                        >
                                            <Send className="w-3 h-3" /> Post Comment
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Brief + Decision */}
                        <div className="space-y-4">
                            {/* Campaign Brief Comparison */}
                            <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
                                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-3">Campaign_Brief</h3>
                                <div className="space-y-2">
                                    {CAMPAIGN_BRIEF.requirements.map((req, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[10px]">
                                            {CAMPAIGN_BRIEF.met[i] ? (
                                                <span className="text-[#a3e635]">✓</span>
                                            ) : (
                                                <span className="text-amber-500">✗</span>
                                            )}
                                            <span className={CAMPAIGN_BRIEF.met[i] ? "text-zinc-400" : "text-zinc-500"}>{req}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-zinc-800">
                                    <span className="text-[10px] font-mono text-zinc-500">Ref: </span>
                                    <span className="text-[10px] font-mono text-[#a3e635] cursor-pointer hover:underline">{CAMPAIGN_BRIEF.guidelinesRef}</span>
                                </div>
                            </div>

                            {/* Decision Panel */}
                            <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm space-y-3">
                                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase">Decision</h3>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={handleApprove}
                                        className="w-full py-2.5 bg-[#a3e635] text-black text-xs font-bold font-mono uppercase rounded-sm hover:bg-[#bef264] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-4 h-4" /> Approve
                                    </button>
                                    <button
                                        onClick={() => setShowRevisionForm(!showRevisionForm)}
                                        className={cn("w-full py-2.5 border text-xs font-bold font-mono uppercase rounded-sm transition-colors flex items-center justify-center gap-2", showRevisionForm ? "bg-amber-500/30 border-amber-500/60 text-amber-300" : "bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-amber-500/30")}
                                    >
                                        <RefreshCw className="w-4 h-4" /> Request Revisions
                                    </button>
                                    <button
                                        onClick={() => setShowRejectModal(true)}
                                        className="w-full py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase rounded-sm hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X className="w-4 h-4" /> Reject
                                    </button>
                                    <button
                                        onClick={handleSaveDraft}
                                        className="w-full py-2 border border-dashed border-zinc-700 text-zinc-500 text-[10px] font-mono uppercase rounded-sm hover:border-zinc-600 hover:text-zinc-400 flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Save className="w-3.5 h-3.5" /> Save Draft
                                    </button>
                                </div>

                                {showRevisionForm && (
                                    <div className="mt-2 pt-4 border-t border-zinc-800 space-y-3">
                                        <div>
                                            <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">What needs changing *</label>
                                            <textarea
                                                value={revisionText}
                                                onChange={e => setRevisionText(e.target.value)}
                                                className="w-full h-20 bg-zinc-950 border border-zinc-800 rounded-sm p-2 text-xs text-white focus:border-[#a3e635] focus:outline-none resize-none"
                                                placeholder="Describe required changes..."
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Reference examples (optional)</label>
                                            <input
                                                type="text"
                                                value={revisionRef}
                                                onChange={e => setRevisionRef(e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-sm p-2 text-xs text-white focus:border-[#a3e635] focus:outline-none"
                                                placeholder="Link or attach..."
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Due date for revisions</label>
                                            <input
                                                type="date"
                                                value={revisionDue}
                                                onChange={e => setRevisionDue(e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-sm p-2 text-xs text-white focus:border-[#a3e635] focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-1">
                                            <button
                                                onClick={() => { setShowRevisionForm(false); setRevisionText(""); setRevisionRef(""); setRevisionDue(""); }}
                                                className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-[10px] font-mono rounded-sm hover:text-white transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleRequestRevisions}
                                                disabled={!revisionText.trim()}
                                                className="flex-1 py-2 bg-amber-500 text-black text-[10px] font-bold font-mono rounded-sm hover:bg-amber-400 disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <Send className="w-3 h-3" /> Send Request
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowRejectModal(false); setRejectReason(""); }} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase">Reject Content</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">From {selected?.creator}</p>
                            </div>
                            <button onClick={() => { setShowRejectModal(false); setRejectReason(""); }} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase block">Rejection reason</label>
                            <textarea
                                autoFocus
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                placeholder="Explain why this content is being rejected..."
                                className="w-full h-24 bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-red-500/40 resize-none"
                            />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { setShowRejectModal(false); setRejectReason(""); }} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleReject} className="flex-1 py-2 bg-red-600 text-white font-bold text-xs uppercase rounded-sm hover:bg-red-500 transition-colors">Confirm Reject</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tag Team Modal */}
            {showTagModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowTagModal(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase">Tag Team Members</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Request a review from your team</p>
                            </div>
                            <button onClick={() => setShowTagModal(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-2">
                                {TEAM_MEMBERS.map(member => (
                                    <label key={member} className="flex items-center gap-3 p-3 border border-zinc-800 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={taggedMembers.has(member)}
                                            onChange={() => {
                                                setTaggedMembers(prev => {
                                                    const next = new Set(prev);
                                                    if (next.has(member)) next.delete(member);
                                                    else next.add(member);
                                                    return next;
                                                });
                                            }}
                                            className="rounded border-zinc-600"
                                        />
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-sm bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-[#a3e635]">
                                                {member.substring(0, 2)}
                                            </div>
                                            <span className="text-xs text-white font-mono">{member}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Note (optional)</label>
                                <textarea
                                    value={tagNote}
                                    onChange={e => setTagNote(e.target.value)}
                                    placeholder="Add context for your team..."
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-sm p-2 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635]/50 resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowTagModal(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleTagTeam}
                                disabled={taggedMembers.size === 0}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                            >
                                <Users className="w-3.5 h-3.5" /> Tag & Notify
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
