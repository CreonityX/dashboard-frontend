import { ArrowUpRight, Download } from "lucide-react";
import { GlassTechCard } from "../GlassTechCard";

export function RevenueChart() {
    return (
        <GlassTechCard title="Net_Earnings" description="REAL_TIME_VALUATION" className="h-full min-h-[300px]">
            <div className="flex flex-col h-full relative">

                {/* Top Stats */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                        <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Total_Balance</div>
                        <div className="text-4xl font-display font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            $124,592<span className="text-zinc-500 text-lg">.00</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-full">
                            <ArrowUpRight className="w-3 h-3 text-[#a3e635]" />
                            <span className="text-xs font-mono font-bold text-[#a3e635]">+12.5%</span>
                        </div>
                    </div>
                    <button className="p-2 border border-white/10 hover:bg-white hover:text-black transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                </div>

                {/* 3D Holographic Bars (Integrated from v6) */}
                <div className="flex-1 flex items-end justify-between gap-4 perspective-1000 pb-4">
                    {[40, 60, 45, 80, 55, 90, 70, 85].map((height, i) => (
                        <div key={i} className="group relative w-full h-full flex items-end">
                            <div
                                className="w-full rounded-t-sm transition-all duration-500 hover:brightness-125 relative group-hover:-translate-y-2 transform-gpu"
                                style={{
                                    height: `${height}%`,
                                    background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.8) 0%, rgba(124, 58, 237, 0.2) 100%)',
                                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
                                    borderTop: '1px solid rgba(255,255,255,0.3)'
                                }}
                            >
                                {/* Reflection Line */}
                                <div className="absolute top-0 left-0 right-0 h-[10%] bg-gradient-to-b from-white/20 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none blur-2xl"></div>

            </div>
        </GlassTechCard>
    );
}
