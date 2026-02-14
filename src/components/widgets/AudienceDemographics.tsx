import { Globe } from "lucide-react";
import { GlassTechCard } from "../GlassTechCard";

export function AudienceDemographics() {
    return (
        <GlassTechCard title="Geo_Data" description="GLOBAL_REACH" className="h-full">
            <div className="flex flex-col h-full">
                {/* Dot Map */}
                <div className="flex-1 relative border border-white/5 bg-black/50 rounded-sm mb-4 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="grid grid-cols-12 gap-1">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div key={i} className={`w-1 h-1 rounded-full ${Math.random() > 0.8 ? 'bg-white' : 'bg-white/10'}`}></div>
                            ))}
                        </div>
                    </div>
                    {/* Hotspots */}
                    <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-[#a3e635] shadow-[0_0_10px_#a3e635] animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-purple-500 shadow-[0_0_10px_#a445ed] animate-pulse delay-75"></div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span>USA</span>
                            <span className="text-white">45%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[45%] bg-white"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span>UK</span>
                            <span className="text-white">22%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[22%] bg-zinc-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassTechCard>
    );
}
