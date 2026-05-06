"use client";

import { useState } from "react";
import { Bookmark, Copy, X, Check } from "lucide-react";
import { CAMPAIGN_TEMPLATES, CAMPAIGNS_LIST } from "@/lib/brand-data";
import { toast } from "sonner";
import { CampaignBuilderWizard } from "../CampaignBuilderWizard";

export function TemplatesTab() {
    const pastCampaigns = CAMPAIGNS_LIST.filter(c => c.status === "completed" || c.status === "archived");
    const [showWizard, setShowWizard] = useState(false);
    const [saveTarget, setSaveTarget] = useState<string | null>(null);
    const [templateName, setTemplateName] = useState("");
    const [dupTarget, setDupTarget] = useState<string | null>(null);
    const [dupName, setDupName] = useState("");

    const handleSaveTemplate = () => {
        if (!templateName.trim()) return;
        toast.success(`Saved as template: "${templateName}"`);
        setSaveTarget(null);
        setTemplateName("");
    };

    const handleDuplicate = () => {
        if (!dupName.trim()) return;
        toast.success(`Campaign duplicated`, { description: `"${dupName}" created as a draft.` });
        setDupTarget(null);
        setDupName("");
    };

    const saveItem = saveTarget ? CAMPAIGNS_LIST.find(c => c.id === saveTarget) : null;
    const dupItem = dupTarget ? CAMPAIGNS_LIST.find(c => c.id === dupTarget) : null;

    return (
        <div className="space-y-8">
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase mb-1">Pre-built Templates</h2>
                        <p className="text-[11px] text-zinc-500 font-mono">Templates by objective. Duplicate to start a new campaign.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#a3e635] text-black text-[10px] font-bold font-mono uppercase rounded-[1px] hover:bg-[#b0f545] transition-colors shadow-[0_0_12px_rgba(163,230,53,0.2)] whitespace-nowrap shrink-0">
                        + Create Template
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CAMPAIGN_TEMPLATES.map(t => (
                        <div key={t.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 hover:border-zinc-700 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <Bookmark className="w-4 h-4 text-[#a3e635]" />
                                <button
                                    onClick={() => setShowWizard(true)}
                                    className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635] flex items-center gap-1 transition-colors"
                                >
                                    <Copy className="w-3 h-3" /> Use
                                </button>
                            </div>
                            <h3 className="text-sm font-bold text-white mb-1">{t.name}</h3>
                            <p className="text-[10px] text-zinc-500 font-mono">{t.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase mb-4">Past Campaigns to Duplicate</h2>
                <p className="text-[11px] text-zinc-500 font-mono mb-4">Save campaign as template or duplicate from library.</p>
                <div className="space-y-2">
                    {pastCampaigns.map(c => (
                        <div key={c.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex items-center justify-between hover:border-zinc-700 transition-colors">
                            <div>
                                <div className="text-sm font-bold text-white">{c.name}</div>
                                <div className="text-[10px] font-mono text-zinc-500">{c.startDate} — {c.endDate} • ${c.budget.toLocaleString()} • {c.creatorsCount} creators</div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setSaveTarget(c.id); setTemplateName(c.name); }}
                                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-zinc-600 transition-colors"
                                >
                                    Save as template
                                </button>
                                <button
                                    onClick={() => { setDupTarget(c.id); setDupName(`${c.name} (copy)`); }}
                                    className="px-3 py-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/20 flex items-center gap-1 transition-colors"
                                >
                                    <Copy className="w-3 h-3" /> Duplicate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showWizard && <CampaignBuilderWizard onClose={() => setShowWizard(false)} onComplete={() => setShowWizard(false)} />}

            {/* Save as Template Modal */}
            {saveTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSaveTarget(null)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase">Save as Template</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{saveItem?.name}</p>
                            </div>
                            <button onClick={() => setSaveTarget(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">Template Name</label>
                            <input
                                autoFocus
                                type="text"
                                value={templateName}
                                onChange={e => setTemplateName(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSaveTemplate()}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                            />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setSaveTarget(null)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleSaveTemplate}
                                disabled={!templateName.trim()}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                            >
                                <Check className="w-3.5 h-3.5" /> Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Duplicate Modal */}
            {dupTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDupTarget(null)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase">Duplicate Campaign</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{dupItem?.name}</p>
                            </div>
                            <button onClick={() => setDupTarget(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">New Campaign Name</label>
                            <input
                                autoFocus
                                type="text"
                                value={dupName}
                                onChange={e => setDupName(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleDuplicate()}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                            />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setDupTarget(null)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleDuplicate}
                                disabled={!dupName.trim()}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                            >
                                <Copy className="w-3.5 h-3.5" /> Duplicate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
