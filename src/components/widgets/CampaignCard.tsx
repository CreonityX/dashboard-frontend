import { Zap } from "lucide-react";
import { GlassTechCard } from "../GlassTechCard";

export function CampaignCard() {
    return (
        <GlassTechCard title="Active_Ops" description="NIKE_GLOBAL_Q1" className="h-full">
            <div className="flex flex-col h-full justify-between">
                <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-1">Brand_Launch</h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#a3e635]">
                        <Zap className="w-3 h-3 fill-current" />
                        <span>ON_TRACK</span>
                    </div>
                </div>

                {/* Progress */}
                <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-500">
                        <span>Completion</span>
                        <span className="text-white">72%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-[#a3e635] shadow-[0_0_10px_#a3e635]"></div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-4">
                    <div>
                        <div className="text-[10px] text-zinc-500 font-mono uppercase">Budget</div>
                        <div className="text-lg font-bold text-white font-mono">$50k</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-500 font-mono uppercase">Time</div>
                        <div className="text-lg font-bold text-white font-mono">14D</div>
                    </div>
                </div>
            </div>
        </GlassTechCard>
    );
}
