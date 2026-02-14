"use client";

import { useState } from "react";
import { ArrowRight, Check, Target, DollarSign, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CampaignWizard() {
    const [step, setStep] = useState(1);

    return (
        <div className="flex flex-col h-full relative">
            {/* Steps Header */}
            <div className="flex items-center justify-between p-6 pb-2">
                <div className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-colors",
                                step === s ? "bg-[#a3e635] text-black" :
                                    step > s ? "bg-zinc-700 text-white" : "bg-zinc-900 border border-zinc-700 text-zinc-600"
                            )}>
                                {step > s ? <Check className="w-3 h-3" /> : s}
                            </div>
                            {s < 3 && <div className="w-8 h-[1px] bg-zinc-800" />}
                        </div>
                    ))}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                    {step === 1 ? 'CAMPAIGN_DETAILS' : step === 2 ? 'BUDGET_CONFIG' : 'CREATIVE_ASSETS'}
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-6 space-y-4">
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-400">CAMPAIGN_NAME</label>
                            <input type="text" placeholder="e.g. Summer_Launch_v3" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-[#a3e635] font-mono placeholder:text-zinc-700" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-400">OBJECTIVE</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="flex items-center gap-2 p-3 bg-[#a3e635]/10 border border-[#a3e635] rounded-sm text-xs font-bold text-white">
                                    <Target className="w-4 h-4 text-[#a3e635]" /> CONVERSION
                                </button>
                                <button className="flex items-center gap-2 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm text-xs font-bold text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300">
                                    <ImageIcon className="w-4 h-4" /> AWARENESS
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-sm flex items-center justify-between">
                            <div className="text-zinc-400 text-xs font-mono">TOTAL_BUDGET</div>
                            <div className="text-xl font-bold font-display text-white">$50,000</div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-zinc-400">BID_STRATEGY</label>
                            <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-[#a3e635] font-mono appearance-none">
                                <option>Target CPA (Recommended)</option>
                                <option>Maximize Clicks</option>
                            </select>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center justify-center h-full animate-in fade-in slide-in-from-right-4 duration-300 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-[#a3e635]/10 flex items-center justify-center border border-[#a3e635]/20 animate-pulse">
                            <Check className="w-8 h-8 text-[#a3e635]" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold font-display tracking-wide">READY_TO_LAUNCH</h4>
                            <p className="text-xs text-zinc-500 font-mono mt-1">Review your campaign before activating.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/5 bg-white/[0.02] flex justify-between">
                <button
                    onClick={() => step > 1 && setStep(step - 1)}
                    className={cn(
                        "px-4 py-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors",
                        step === 1 && "opacity-0 pointer-events-none"
                    )}
                >
                    BACK
                </button>
                <button
                    onClick={() => step < 3 && setStep(step + 1)}
                    className="px-4 py-2 bg-white text-black font-bold font-mono text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2 clip-button"
                >
                    {step === 3 ? 'LAUNCH_CAMPAIGN' : 'NEXT_STEP'} <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
