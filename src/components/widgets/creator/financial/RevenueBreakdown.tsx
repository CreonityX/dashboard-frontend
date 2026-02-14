"use client";

import { useMemo } from "react";

export function RevenueBreakdown() {
    const segments = [
        { label: "GIG_PROJECTS", value: 65, color: "#a3e635" }, // Lime
        { label: "TIPS_&_EXTRAS", value: 20, color: "#cbd5e1" }, // Slate 300
        { label: "AFFILIATE", value: 15, color: "#3f3f46" }, // Zinc 700
    ];

    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    // Calculate segments with cumulative offsets
    const chartData = useMemo(() => {
        let currentOffset = 0;
        return segments.map((seg) => {
            const strokeLength = (seg.value / 100) * circumference;
            // The dasharray pattern: [length of segment, rest of circle]
            const dashArray = `${strokeLength} ${circumference - strokeLength}`;
            // The offset: where this segment starts. 
            // SVG draws counter-clockwise from 3 o'clock usually, or we rotate -90 to start at 12.
            // dashoffset pushes the start point "backwards". 
            const dashOffset = -currentOffset;

            const data = {
                ...seg,
                dashArray,
                dashOffset
            };

            currentOffset += strokeLength;
            return data;
        });
    }, [circumference, segments]); // Added segments to dependency array for completeness

    return (
        <div className="flex flex-col h-full p-6 relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <div className="w-16 h-16 border border-white rounded-full border-dashed animate-spin-slow"></div>
            </div>

            <h3 className="text-sm font-bold text-white font-display tracking-wide mb-6 z-10">REVENUE_SOURCES</h3>

            <div className="flex items-center gap-8 relative z-10">
                <div className="relative w-32 h-32 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Background Track */}
                        <circle cx="50" cy="50" r={radius} fill="none" stroke="#18181b" strokeWidth="8" />

                        {chartData.map((seg, i) => (
                            <circle
                                key={i}
                                cx="50"
                                cy="50"
                                r={radius}
                                fill="none"
                                stroke={seg.color}
                                strokeWidth="8"
                                strokeDasharray={seg.dashArray}
                                strokeDashoffset={seg.dashOffset}
                                strokeLinecap="butt"
                                className="transition-all duration-1000 ease-out hover:stroke-width-10 hover:opacity-80"
                            />
                        ))}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] font-mono text-zinc-500">SOURCES</span>
                        <span className="text-xl font-bold text-white font-display">{segments.length}</span>
                    </div>
                </div>

                <div className="space-y-3 flex-1">
                    {segments.map((seg) => (
                        <div key={seg.label} className="flex justify-between items-center text-xs group">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: seg.color }} />
                                <span className="text-zinc-500 font-mono group-hover:text-zinc-300 transition-colors">{seg.label}</span>
                            </div>
                            <span className="text-white font-mono font-bold">{seg.value}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 space-y-2 z-10">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>TOP_CLIENT</span>
                    <span className="text-white">CYBER_DYNE_SYSTEMS</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>AVG_RATE</span>
                    <span className="text-white">$85.00 / HR</span>
                </div>
            </div>
        </div>
    );
}
