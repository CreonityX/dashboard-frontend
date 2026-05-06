"use client";

import { useState } from "react";
import { X, Megaphone, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_BRAND_CONVERSATIONS, MOCK_CAMPAIGNS, MESSAGE_TEMPLATES } from "@/lib/brand-data";

export function BroadcastModal({ onClose }: { onClose: () => void }) {
    const [message, setMessage] = useState("");
    const [recipientMode, setRecipientMode] = useState<'campaign' | 'selected'>('campaign');
    const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
    const [selectedCreators, setSelectedCreators] = useState<Set<string>>(new Set());
    const [templateId, setTemplateId] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const creators = MOCK_BRAND_CONVERSATIONS.filter(c => !c.isSupport);
    const campaigns = MOCK_CAMPAIGNS;

    const toggleCreator = (id: string) => {
        setSelectedCreators(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const applyTemplate = (id: string) => {
        const t = MESSAGE_TEMPLATES.find(x => x.id === id);
        if (t) {
            setMessage(t.text);
            setTemplateId(id);
        }
    };

    const handleSend = () => {
        setSent(true);
        setTimeout(() => onClose(), 1500);
    };

    const campaignCreators = selectedCampaign
        ? creators.filter(c => c.campaignId === selectedCampaign)
        : creators;

    const recipientCount = recipientMode === 'campaign' && selectedCampaign
        ? campaignCreators.length
        : selectedCreators.size;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col bg-zinc-900 border border-zinc-800 rounded-sm">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/80 shrink-0">
                    <div className="flex items-center gap-2">
                        <Megaphone className="w-5 h-5 text-[#a3e635]" />
                        <h2 className="text-sm font-bold text-white font-display tracking-tight">Broadcast Message</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {sent ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-12">
                        <div className="w-16 h-16 rounded-full bg-[#a3e635]/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-[#a3e635]" />
                        </div>
                        <p className="text-sm font-mono text-zinc-400">MESSAGE_SENT</p>
                        <p className="text-xs text-zinc-500">Delivered to {recipientCount} creator(s)</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {/* Recipient Selector */}
                        <div>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase mb-2 font-mono tracking-wider">Recipients</h3>
                            <div className="flex gap-2 mb-2">
                                <button
                                    onClick={() => setRecipientMode('campaign')}
                                    className={cn(
                                        "flex-1 py-2 px-3 rounded-sm text-[11px] font-mono border transition-colors",
                                        recipientMode === 'campaign'
                                            ? "bg-zinc-800 text-white border-zinc-700"
                                            : "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700"
                                    )}
                                >
                                    All in Campaign
                                </button>
                                <button
                                    onClick={() => setRecipientMode('selected')}
                                    className={cn(
                                        "flex-1 py-2 px-3 rounded-sm text-[11px] font-mono border transition-colors",
                                        recipientMode === 'selected'
                                            ? "bg-zinc-800 text-white border-zinc-700"
                                            : "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700"
                                    )}
                                >
                                    Selected Creators
                                </button>
                            </div>
                            {recipientMode === 'campaign' && (
                                <select
                                    value={selectedCampaign || ""}
                                    onChange={(e) => setSelectedCampaign(e.target.value || null)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2 px-3 text-xs text-zinc-400 focus:border-[#a3e635] focus:outline-none font-mono"
                                >
                                    <option value="">Select campaign...</option>
                                    {campaigns.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} ({creators.filter(x => x.campaignId === c.id).length} creators)</option>
                                    ))}
                                </select>
                            )}
                            {recipientMode === 'selected' && (
                                <div className="max-h-32 overflow-y-auto space-y-1 p-2 bg-zinc-900/30 rounded-sm border border-zinc-800 custom-scrollbar">
                                    {creators.map(c => (
                                        <label key={c.id} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={selectedCreators.has(c.id)}
                                                onChange={() => toggleCreator(c.id)}
                                                className="rounded border-zinc-600 text-[#a3e635] focus:ring-[#a3e635]/50"
                                            />
                                            <span className="text-xs text-zinc-400">{c.creator}</span>
                                            {c.campaign && <span className="text-[10px] text-zinc-600">• {c.campaign}</span>}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Template Quick Select */}
                        <div>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase mb-2 font-mono tracking-wider">Templates</h3>
                            <div className="flex flex-wrap gap-1">
                                {MESSAGE_TEMPLATES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => applyTemplate(t.id)}
                                        className={cn(
                                            "px-2 py-1 rounded-sm text-[10px] font-mono border transition-colors",
                                            templateId === t.id
                                                ? "bg-[#a3e635]/10 border-[#a3e635]/30 text-[#a3e635]"
                                                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                                        )}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase mb-2 font-mono tracking-wider">Message</h3>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your broadcast message..."
                                rows={5}
                                className="w-full bg-black/40 border border-zinc-800 rounded-sm p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635] resize-none font-sans"
                            />
                        </div>
                    </div>
                )}

                {/* Footer */}
                {!sent && (
                    <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 shrink-0 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white border border-zinc-800 rounded-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || (recipientMode === 'campaign' ? !selectedCampaign : selectedCreators.size === 0)}
                            className="px-4 py-2 text-xs font-bold font-mono bg-[#a3e635] hover:bg-[#bef264] text-black rounded-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            <Send className="w-3.5 h-3.5" /> Send to {recipientCount}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
