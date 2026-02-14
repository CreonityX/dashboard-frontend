import { ArrowUpRight } from "lucide-react";

export function HolographicRevenue() {
    return (
        <div className="w-full h-full flex flex-col justify-end min-h-[220px]">

            {/* 3D Bars Container */}
            <div className="flex items-end justify-between gap-3 h-32 px-2 mb-6 perspective-500">
                {[40, 60, 45, 80, 55, 90].map((height, i) => (
                    <div key={i} className="group relative w-full h-full flex items-end">
                        {/* 3D Bar Visual */}
                        <div
                            className="w-full rounded-t-sm transition-all duration-500 hover:brightness-125 relative"
                            style={{
                                height: `${height}%`,
                                background: 'linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%)',
                                boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)'
                            }}
                        >
                            {/* Top Face for 3D effect */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 rounded-t-sm"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Floating Stats */}
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/5 flex justify-between items-center relative overflow-hidden group">

                {/* Neon Glow Line */}
                <div className="absolute bottom-0 left-0 h-[3px] bg-[#a3e635] w-[40%] rounded-r-full shadow-[0_0_10px_#a3e635]"></div>

                <div>
                    <div className="text-[10px] text-white/40 font-mono uppercase tracking-wider mb-0.5">Total Revenue</div>
                    <div className="text-2xl font-display font-bold text-white tracking-tight">$12,450</div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>

        </div>
    );
}
