"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Budget" },
    { id: 3, label: "Target Creators" },
    { id: 4, label: "Content Requirements" },
    { id: 5, label: "Assets & Materials" },
    { id: 6, label: "Timeline & Milestones" },
    { id: 7, label: "Review & Launch" },
];

interface CampaignBuilderWizardProps {
    onClose: () => void;
    onComplete: () => void;
}

export function CampaignBuilderWizard({ onClose, onComplete }: CampaignBuilderWizardProps) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: "",
        objective: "",
        industry: "",
        startDate: "",
        endDate: "",
        description: "",
        internalNotes: "",
        totalBudget: "",
        perCreatorMin: "",
        perCreatorMax: "",
        paymentTerms: "milestone",
        buffer: "",
        niche: "",
        platform: "",
        followerMin: "",
        followerMax: "",
        engagementMin: "",
        location: "",
        language: "",
        demographicsMatch: "",
        creatorsNeeded: "",
        contentType: "",
        contentQuantity: "",
        keyMessages: "",
        hashtags: "",
        mentionRequirement: "",
        cta: "",
        linkToInclude: "",
        usageRights: "organic",
        exclusivity: "",
        ftcDisclosure: "",
        appDeadline: "",
        selectionDeadline: "",
        draftDeadline: "",
        finalContentDeadline: "",
        publishingWindow: "",
        milestoneTriggers: "",
    });

    const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-sm flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                    <h2 className="text-sm font-bold text-white font-display">Create Campaign</h2>
                    <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex border-b border-zinc-800 overflow-x-auto">
                    {STEPS.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setStep(s.id)}
                            className={cn(
                                "px-4 py-2 text-[10px] font-mono shrink-0 border-b-2 -mb-px",
                                step === s.id ? "border-[#a3e635] text-[#a3e635]" : "border-transparent text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            {s.id}. {s.label}
                        </button>
                    ))}
                </div>
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Campaign name</label>
                                <input value={form.name} onChange={e => update("name", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. S26 Launch" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Objective</label>
                                <select value={form.objective} onChange={e => update("objective", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono">
                                    <option value="">Select objective</option>
                                    <option value="awareness">Brand awareness</option>
                                    <option value="product_launch">Product launch</option>
                                    <option value="conversions">Sales / conversions</option>
                                    <option value="engagement">Engagement</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Industry / category</label>
                                <input value={form.industry} onChange={e => update("industry", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. Tech" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-mono text-zinc-500 block mb-1">Start date</label>
                                    <input type="date" value={form.startDate} onChange={e => update("startDate", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-mono text-zinc-500 block mb-1">End date</label>
                                    <input type="date" value={form.endDate} onChange={e => update("endDate", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Campaign description / brief</label>
                                <textarea value={form.description} onChange={e => update("description", e.target.value)} rows={3} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono resize-none" placeholder="Brief for creators..." />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Internal notes</label>
                                <textarea value={form.internalNotes} onChange={e => update("internalNotes", e.target.value)} rows={2} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-500 font-mono resize-none" placeholder="Internal only" />
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Total campaign budget ($)</label>
                                <input type="number" value={form.totalBudget} onChange={e => update("totalBudget", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-mono text-zinc-500 block mb-1">Per-creator min ($)</label>
                                    <input type="number" value={form.perCreatorMin} onChange={e => update("perCreatorMin", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-mono text-zinc-500 block mb-1">Per-creator max ($)</label>
                                    <input type="number" value={form.perCreatorMax} onChange={e => update("perCreatorMax", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Payment terms</label>
                                <select value={form.paymentTerms} onChange={e => update("paymentTerms", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono">
                                    <option value="upfront">Upfront</option>
                                    <option value="milestone">Milestone-based</option>
                                    <option value="completion">Upon completion</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Buffer / contingency ($)</label>
                                <input type="number" value={form.buffer} onChange={e => update("buffer", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" />
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Desired niche / category</label>
                                <input value={form.niche} onChange={e => update("niche", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. Tech Reviews" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Platform preference</label>
                                <select value={form.platform} onChange={e => update("platform", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono">
                                    <option value="">Any</option>
                                    <option value="YouTube">YouTube</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="TikTok">TikTok</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-mono text-zinc-500 block mb-1">Follower min</label>
                                    <input value={form.followerMin} onChange={e => update("followerMin", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. 10K" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-mono text-zinc-500 block mb-1">Follower max</label>
                                    <input value={form.followerMax} onChange={e => update("followerMax", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. 1M" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Engagement rate min (%)</label>
                                <input value={form.engagementMin} onChange={e => update("engagementMin", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Location / region</label>
                                <input value={form.location} onChange={e => update("location", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. US" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Language</label>
                                <input value={form.language} onChange={e => update("language", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. English" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Demographics match</label>
                                <input value={form.demographicsMatch} onChange={e => update("demographicsMatch", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. 25-44, US" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Number of creators needed</label>
                                <input type="number" value={form.creatorsNeeded} onChange={e => update("creatorsNeeded", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" />
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Content type</label>
                                <select value={form.contentType} onChange={e => update("contentType", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono">
                                    <option value="">Select</option>
                                    <option value="post">Post</option>
                                    <option value="story">Story</option>
                                    <option value="video">Video</option>
                                    <option value="blog">Blog</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Quantity (e.g. 3 posts + 5 stories)</label>
                                <input value={form.contentQuantity} onChange={e => update("contentQuantity", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="3 posts + 5 stories" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Content guidelines document</label>
                                <div className="border border-dashed border-zinc-700 rounded-sm px-4 py-6 text-center text-[10px] font-mono text-zinc-500 hover:border-zinc-600 cursor-pointer">Click or drag to upload PDF</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Key messages to include</label>
                                <textarea value={form.keyMessages} onChange={e => update("keyMessages", e.target.value)} rows={2} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono resize-none" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Required hashtags</label>
                                <input value={form.hashtags} onChange={e => update("hashtags", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="#brand #campaign" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Mention requirements (@brandname)</label>
                                <input value={form.mentionRequirement} onChange={e => update("mentionRequirement", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="@brandname" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Call-to-action (CTA)</label>
                                <input value={form.cta} onChange={e => update("cta", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. Shop now" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Link to include</label>
                                <input value={form.linkToInclude} onChange={e => update("linkToInclude", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Usage rights</label>
                                <select value={form.usageRights} onChange={e => update("usageRights", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono">
                                    <option value="organic">Organic only</option>
                                    <option value="paid_ads">Paid ads</option>
                                    <option value="both">Both</option>
                                </select>
                                <input type="text" placeholder="Duration (e.g. 1 year)" className="w-full mt-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Exclusivity requirements</label>
                                <input value={form.exclusivity} onChange={e => update("exclusivity", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. 90 days category exclusivity" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">FTC disclosure requirements</label>
                                <input value={form.ftcDisclosure} onChange={e => update("ftcDisclosure", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. #ad or Paid partnership" />
                            </div>
                        </div>
                    )}
                    {step === 5 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Brand guidelines PDF</label>
                                <div className="border border-dashed border-zinc-700 rounded-sm px-4 py-4 text-center text-[10px] font-mono text-zinc-500 hover:border-zinc-600 cursor-pointer">Upload file</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Logos (multiple formats)</label>
                                <div className="border border-dashed border-zinc-700 rounded-sm px-4 py-4 text-center text-[10px] font-mono text-zinc-500 hover:border-zinc-600 cursor-pointer">Upload SVG, PNG, JPG</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Product images</label>
                                <div className="border border-dashed border-zinc-700 rounded-sm px-4 py-4 text-center text-[10px] font-mono text-zinc-500 hover:border-zinc-600 cursor-pointer">Upload images</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Videos</label>
                                <div className="border border-dashed border-zinc-700 rounded-sm px-4 py-4 text-center text-[10px] font-mono text-zinc-500 hover:border-zinc-600 cursor-pointer">Upload video files</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Talking points document</label>
                                <div className="border border-dashed border-zinc-700 rounded-sm px-4 py-4 text-center text-[10px] font-mono text-zinc-500 hover:border-zinc-600 cursor-pointer">Upload doc</div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Reference links</label>
                                <input className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="https://..." />
                            </div>
                        </div>
                    )}
                    {step === 6 && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Application deadline</label>
                                <input type="date" value={form.appDeadline} onChange={e => update("appDeadline", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Creator selection deadline</label>
                                <input type="date" value={form.selectionDeadline} onChange={e => update("selectionDeadline", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Draft submission deadline</label>
                                <input type="date" value={form.draftDeadline} onChange={e => update("draftDeadline", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Final content due date</label>
                                <input type="date" value={form.finalContentDeadline} onChange={e => update("finalContentDeadline", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-zinc-400 font-mono" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Publishing window</label>
                                <input value={form.publishingWindow} onChange={e => update("publishingWindow", e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono" placeholder="e.g. Mar 1–15, 2026" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-zinc-500 block mb-1">Milestone payment triggers</label>
                                <textarea value={form.milestoneTriggers} onChange={e => update("milestoneTriggers", e.target.value)} rows={3} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-sm text-white font-mono resize-none" placeholder="e.g. 30% on acceptance, 40% on draft approval, 30% on publish" />
                            </div>
                        </div>
                    )}
                    {step === 7 && (
                        <div className="space-y-4">
                            <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-sm">
                                <h3 className="text-xs font-bold text-white mb-3">Preview campaign as creators see it</h3>
                                <div className="text-[10px] font-mono text-zinc-400 mb-3 space-y-1">
                                    <p>{form.name || "Campaign name"} — {form.objective || "Objective"}</p>
                                    <p>{form.description || "Brief..."}</p>
                                    <p>Budget: ${form.totalBudget || "—"} • Creators: {form.creatorsNeeded || "—"}</p>
                                </div>
                                <button type="button" onClick={() => {}} className="text-[10px] font-mono text-[#a3e635] hover:underline">Edit any section ←</button>
                            </div>
                            <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-sm">
                                <h3 className="text-xs font-bold text-white mb-3">Campaign Summary</h3>
                                <dl className="space-y-2 text-[10px] font-mono">
                                    <div><dt className="text-zinc-500">Name</dt><dd className="text-white">{form.name || "—"}</dd></div>
                                    <div><dt className="text-zinc-500">Objective</dt><dd className="text-white">{form.objective || "—"}</dd></div>
                                    <div><dt className="text-zinc-500">Budget</dt><dd className="text-white">${form.totalBudget || "—"}</dd></div>
                                    <div><dt className="text-zinc-500">Creators</dt><dd className="text-white">{form.creatorsNeeded || "—"}</dd></div>
                                    <div><dt className="text-zinc-500">Content</dt><dd className="text-white">{form.contentType || "—"} • {form.contentQuantity || "—"}</dd></div>
                                    <div><dt className="text-zinc-500">Key dates</dt><dd className="text-white">{form.appDeadline || "—"} to {form.finalContentDeadline || "—"}</dd></div>
                                </dl>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-400 rounded-sm hover:border-zinc-600">Save as draft</button>
                                <button onClick={onComplete} className="px-3 py-2 bg-[#a3e635] text-black text-xs font-mono font-bold rounded-sm hover:bg-[#b5f045]">Publish campaign</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-between p-4 border-t border-zinc-800">
                    <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className={cn("flex items-center gap-2 px-4 py-2 text-xs font-mono", step === 1 ? "text-zinc-600 cursor-not-allowed" : "text-zinc-400 hover:text-white")}>
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    {step < 7 ? (
                        <button onClick={() => setStep(s => Math.min(7, s + 1))} className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black text-xs font-mono font-bold rounded-sm hover:bg-[#b5f045]">
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
