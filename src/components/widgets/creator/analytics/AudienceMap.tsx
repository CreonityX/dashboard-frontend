"use client";

import { Globe, MapPin } from "lucide-react";

export function AudienceMap() {
    const locations = [
        { id: "US", x: 20, y: 35, label: "USA", val: "45%" },
        { id: "EU", x: 48, y: 30, label: "EUR", val: "28%" },
        { id: "AS", x: 75, y: 40, label: "ASIA", val: "15%" },
    ];

    return (
        <div className="flex flex-col h-full bg-zinc-950 relative overflow-hidden">
            {/* Map Grid Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="relative z-10 flex-1 w-full h-full p-6">
                {/* Simulated World Map Points */}
                <div className="relative w-full h-full">
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        >
                            {/* Pulse Effect */}
                            <div className="absolute inset-0 animate-ping rounded-full bg-[#a3e635] opacity-20"></div>

                            {/* Dot */}
                            <div className="relative w-2 h-2 bg-[#a3e635] rounded-full shadow-[0_0_10px_#a3e635] cursor-pointer hover:scale-150 transition-transform" />

                            {/* Tooltip */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-zinc-800 px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                <div className="text-[10px] font-bold text-white font-mono">{loc.label} <span className="text-[#a3e635]">{loc.val}</span></div>
                            </div>

                            {/* Connecting Lines (Decor) */}
                            <div className="absolute top-1 left-1 w-16 h-[1px] bg-gradient-to-r from-[#a3e635]/50 to-transparent transform rotate-45 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity" />
                        </div>
                    ))}

                    {/* Decorative Map Outline (Abstract) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 200 100" preserveAspectRatio="none">
                        <path d="M20,30 Q40,10 60,30 T100,50 T140,30 T180,50" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                    </svg>
                </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-[10px] text-zinc-500 font-mono mb-1">TOP_REGION</div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                            <Globe className="w-3 h-3 text-[#a3e635]" /> NORTH_AMERICA
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-zinc-500 font-mono mb-1">GROWTH</div>
                        <div className="text-sm font-bold text-[#a3e635]">+12.4%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
