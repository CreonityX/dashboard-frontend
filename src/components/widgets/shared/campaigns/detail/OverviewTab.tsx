"use client";

import { useState } from "react";
import { Pencil, Pause, Play, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CAMPAIGNS_LIST } from "@/lib/brand-data";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

export function OverviewTab({ campaignId }: { campaignId: string }) {
    const campaign = CAMPAIGNS_LIST.find(c => c.id === campaignId);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState(campaign?.name || "");
    const [editBrief, setEditBrief] = useState("Brief for creators: Launch campaign for S26 smartphone. Focus on low-light camera, battery life. 3 posts + 1 story minimum. #S26 #TechReview.");
    const [showPauseConfirm, setShowPauseConfirm] = useState(false);
    const [paused, setPaused] = useState(false);

    if (!campaign) return <div className="text-zinc-500 font-mono">Campaign not found</div>;

    const pctSpent = campaign.budget > 0 ? Math.round((campaign.spent / campaign.budget) * 100) : 0;
    const applied = 5;
    const selected = 3;
    const active = campaign.creatorsCount;
    const completed = campaign.status === 'completed' ? active : 0;
    const isActive = campaign.status === 'active';

    const handleEditSave = () => {
        if (!editName.trim()) return;
        toast.success("Campaign updated");
        setShowEditModal(false);
    };

    const handlePauseToggle = () => {
        setPaused(p => !p);
        toast.success(paused ? "Campaign resumed" : "Campaign paused", { description: campaign.name });
        setShowPauseConfirm(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-sm font-bold text-white">{campaign.name}</h2>
                            <span className={cn(
                                "text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase",
                                (!paused && campaign.status === 'active') && "bg-[#a3e635]/10 text-[#a3e635]",
                                (paused || campaign.status === 'paused') && "bg-amber-500/10 text-amber-400",
                                campaign.status === 'draft' && "bg-zinc-700 text-zinc-400"
                            )}>{paused ? "paused" : campaign.status}</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500">{campaign.startDate} — {campaign.endDate}</div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setEditName(campaign.name); setShowEditModal(true); }}
                            className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635] flex items-center gap-2 transition-colors"
                        >
                            <Pencil className="w-3 h-3" /> Edit
                        </button>
                        {isActive && (
                            <button
                                onClick={() => setShowPauseConfirm(true)}
                                className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-400 rounded-sm flex items-center gap-2 hover:bg-amber-500/20 transition-colors"
                            >
                                {paused ? <><Play className="w-3 h-3" /> Resume</> : <><Pause className="w-3 h-3" /> Pause</>}
                            </button>
                        )}
                    </div>
                </div>
                <div className="text-xs text-zinc-400 font-mono mb-6 max-w-2xl">
                    {editBrief}
                </div>
                <div className="mb-6">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
                        <span>Budget</span>
                        <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-[1px] overflow-hidden">
                        <div className="h-full bg-[#a3e635] rounded-[1px] transition-all" style={{ width: `${Math.min(pctSpent, 100)}%` }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "Applied", value: applied, color: "text-zinc-400" },
                        { label: "Selected", value: selected, color: "text-blue-400" },
                        { label: "Active", value: active, color: "text-[#a3e635]" },
                        { label: "Completed", value: completed, color: "text-zinc-400" },
                    ].map(s => (
                        <div key={s.label} className="bg-zinc-950/50 border border-zinc-800 rounded-sm p-3">
                            <div className={cn("text-lg font-bold font-mono", s.color)}>{s.value}</div>
                            <div className="text-[10px] font-mono text-zinc-500">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
                    <div className="relative z-10 w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Edit Campaign</h3>
                            <button onClick={() => setShowEditModal(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase">Campaign Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase">Campaign Brief</label>
                                <textarea
                                    value={editBrief}
                                    onChange={e => setEditBrief(e.target.value)}
                                    rows={4}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50 resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleEditSave}
                                disabled={!editName.trim()}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                            >
                                <Check className="w-3.5 h-3.5" /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pause/Resume Confirm */}
            <ConfirmModal
                open={showPauseConfirm}
                onClose={() => setShowPauseConfirm(false)}
                onConfirm={handlePauseToggle}
                title={paused ? "Resume Campaign" : "Pause Campaign"}
                description={paused
                    ? `Resume "${campaign.name}"? Creators will be notified and activity will resume.`
                    : `Pause "${campaign.name}"? No new content will be processed until resumed.`
                }
                confirmLabel={paused ? "Resume" : "Pause"}
            />
        </div>
    );
}
