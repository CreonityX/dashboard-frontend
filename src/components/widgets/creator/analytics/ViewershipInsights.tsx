"use client";

import { useState } from "react";
import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";

export function ViewershipInsights() {
    const [activeTab, setActiveTab] = useState<'VIEWS' | 'ENGAGEMENT'>('VIEWS');

    return (
        <div className="flex flex-col h-full">
            {/* Controls */}
            <div className="flex items-center justify-between p-6 pb-2">
                <div className="flex gap-1 bg-zinc-900/50 p-1 rounded-sm border border-zinc-800">
                    <button
                        onClick={() => setActiveTab('VIEWS')}
                        className={`px-3 py-1 text-[10px] font-mono rounded-[2px] transition-all ${activeTab === 'VIEWS' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        VIEWS
                    </button>
                    <button
                        onClick={() => setActiveTab('ENGAGEMENT')}
                        className={`px-3 py-1 text-[10px] font-mono rounded-[2px] transition-all ${activeTab === 'ENGAGEMENT' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        ENGAGEMENT
                    </button>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#a3e635]">
                    <TrendingUp className="w-3 h-3" /> +24.5%
                </div>
            </div>

            {/* Main Chart Area */}
            <div className="flex-1 relative w-full px-6 py-4">
                {/* SVG Line Chart */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={activeTab === 'VIEWS' ? '#3b82f6' : '#a3e635'} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={activeTab === 'VIEWS' ? '#3b82f6' : '#a3e635'} stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

                    {/* Path */}
                    <path
                        d={activeTab === 'VIEWS'
                            ? "M0,45 C10,40 20,48 30,35 C40,20 50,25 60,15 C70,5 80,10 90,5 L100,0 L100,50 L0,50 Z"
                            : "M0,40 C15,45 30,30 45,35 C60,40 75,20 90,15 L100,10 L100,50 L0,50 Z"
                        }
                        fill="url(#viewGradient)"
                        className="transition-all duration-500 ease-in-out"
                    />
                    <path
                        d={activeTab === 'VIEWS'
                            ? "M0,45 C10,40 20,48 30,35 C40,20 50,25 60,15 C70,5 80,10 90,5 L100,0"
                            : "M0,40 C15,45 30,30 45,35 C60,40 75,20 90,15 L100,10"
                        }
                        fill="none"
                        stroke={activeTab === 'VIEWS' ? '#3b82f6' : '#a3e635'}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-500 ease-in-out"
                    />
                </svg>
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-2 border-t border-white/5 bg-white/[0.02]">
                <div className="p-4 border-r border-white/5">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mb-1">
                        <Eye className="w-3 h-3" /> TOTAL_VIEWS
                    </div>
                    <div className="text-xl font-bold text-white font-display">2.4M</div>
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mb-1">
                        <MousePointerClick className="w-3 h-3" /> AVG_CTR
                    </div>
                    <div className="text-xl font-bold text-white font-display">4.8%</div>
                </div>
            </div>
        </div>
    );
}
