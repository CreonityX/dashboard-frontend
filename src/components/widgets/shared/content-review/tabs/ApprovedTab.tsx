"use client";

import { useState } from "react";
import { CheckCircle, Download, Calendar, BarChart3, X, Clock } from "lucide-react";
import { APPROVED_CONTENT } from "@/lib/brand-data";
import { toast } from "sonner";

export function ApprovedTab() {
    const [scheduleTarget, setScheduleTarget] = useState<string | null>(null);
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const [scheduledItems, setScheduledItems] = useState<Record<string, string>>({});

    const handleDownload = (creator: string, campaign: string) => {
        toast.success(`Downloading content`, { description: `${creator} — ${campaign}` });
    };

    const handleDownloadAll = () => {
        toast.success("Preparing download", { description: `${APPROVED_CONTENT.length} files will be packaged as a ZIP.` });
    };

    const handleSchedule = () => {
        if (!scheduleDate || !scheduleTime) {
            toast.error("Please select a date and time.");
            return;
        }
        const item = APPROVED_CONTENT.find(c => c.id === scheduleTarget);
        if (!item || !scheduleTarget) return;
        const label = `${scheduleDate} at ${scheduleTime}`;
        setScheduledItems(prev => ({ ...prev, [scheduleTarget]: label }));
        toast.success(`Content scheduled`, { description: `${item.creator}'s content will publish on ${label}.` });
        setScheduleTarget(null);
        setScheduleDate("");
        setScheduleTime("");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Approved_Content_Library</h2>
                <button
                    onClick={handleDownloadAll}
                    className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black text-xs font-bold font-mono uppercase rounded-sm hover:bg-[#bef264] transition-colors"
                >
                    <Download className="w-4 h-4" /> Download All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {APPROVED_CONTENT.map(item => (
                    <div key={item.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors group">
                        <div className="h-32 bg-zinc-800 flex items-center justify-center relative">
                            <div className="w-12 h-12 rounded-sm bg-[#a3e635]/20 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-[#a3e635]" />
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="text-xs font-bold text-white">{item.creator}</div>
                            <div className="text-[10px] text-zinc-500 font-mono">{item.campaign}</div>
                            <div className="flex flex-wrap gap-2 text-[9px] font-mono">
                                <span className="text-zinc-600">Rights: <span className="text-zinc-400">{item.usageRights}</span></span>
                                {(scheduledItems[item.id] || item.scheduled) && (
                                    <span className="flex items-center gap-1 text-[#a3e635]">
                                        <Calendar className="w-3 h-3" /> {scheduledItems[item.id] || item.scheduled}
                                    </span>
                                )}
                            </div>
                            {item.views && (
                                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                                    <BarChart3 className="w-3 h-3" /> {item.views} views
                                </div>
                            )}
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleDownload(item.creator, item.campaign)}
                                    className="flex-1 py-1.5 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Download className="w-3 h-3" /> Download
                                </button>
                                <button
                                    onClick={() => setScheduleTarget(item.id)}
                                    className="flex-1 py-1.5 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/10 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Clock className="w-3 h-3" /> {scheduledItems[item.id] ? "Reschedule" : "Schedule"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Schedule Modal */}
            {scheduleTarget && (() => {
                const item = APPROVED_CONTENT.find(c => c.id === scheduleTarget);
                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setScheduleTarget(null)} />
                        <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                                <div>
                                    <h3 className="text-sm font-bold text-white font-display uppercase">Schedule Publication</h3>
                                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item?.creator} — {item?.campaign}</p>
                                </div>
                                <button onClick={() => setScheduleTarget(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="px-6 py-5 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Publish Date</label>
                                    <input
                                        type="date"
                                        autoFocus
                                        value={scheduleDate}
                                        onChange={e => setScheduleDate(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Publish Time</label>
                                    <input
                                        type="time"
                                        value={scheduleTime}
                                        onChange={e => setScheduleTime(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                                <button onClick={() => setScheduleTarget(null)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                                <button
                                    onClick={handleSchedule}
                                    disabled={!scheduleDate || !scheduleTime}
                                    className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-3.5 h-3.5" /> Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
