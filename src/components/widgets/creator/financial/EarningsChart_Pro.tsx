"use client";

import { useMemo, useState } from "react";

const DATA_POINTS = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 7500, 6100, 8900, 9200, 11400];
const LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function EarningsChart_Pro() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const points = useMemo(() => {
        const max = Math.max(...DATA_POINTS);
        return DATA_POINTS.map((val, i) => {
            const x = (i / (DATA_POINTS.length - 1)) * 100;
            const y = 100 - (val / max) * 80; // keep some headroom
            return { x, y, val, label: LABELS[i] };
        });
    }, []);

    const pathD = useMemo(() => {
        return points.reduce((acc, point, i) => {
            if (i === 0) return `M ${point.x} ${point.y}`;

            // simple smoothing
            const prev = points[i - 1];
            const cp1x = prev.x + (point.x - prev.x) / 2;
            const cp1y = prev.y;
            const cp2x = prev.x + (point.x - prev.x) / 2;
            const cp2y = point.y;

            return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
        }, "");
    }, [points]);

    // Close the path for fill
    const fillPathD = `${pathD} L 100 100 L 0 100 Z`;

    return (
        <div className="flex flex-col h-full w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-sm font-bold text-white font-display tracking-wide">REVENUE_ANALYTICS</h3>
                    <p className="text-[10px] text-zinc-500 font-mono">GROSS_VOLUME_YEARLY</p>
                </div>
                <div className="text-right">
                    <div className="text-xs font-mono text-[#a3e635] font-bold">+$12.4k</div>
                    <div className="text-[10px] text-zinc-600 font-mono">THIS_MONTH</div>
                </div>
            </div>

            <div className="flex-1 relative w-full h-full min-h-0">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        </pattern>
                    </defs>

                    {/* Grid Background */}
                    <rect width="100" height="100" fill="url(#grid)" />

                    {/* Area Fill */}
                    <path d={fillPathD} fill="url(#chartGradient)" />

                    {/* Line Stroke */}
                    <path d={pathD} fill="none" stroke="#a3e635" strokeWidth="1" vectorEffect="non-scaling-stroke" />

                    {/* Interactive Points */}
                    {points.map((p, i) => (
                        <g key={i}>
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r="0" // invisible target unless hovered
                                className="fill-[#a3e635] stroke-black stroke-[0.5]"
                                style={{
                                    r: hoveredIndex === i ? 2 : 0,
                                    transition: "r 0.2s ease"
                                }}
                            />
                            {/* Hit Area */}
                            <rect
                                x={p.x - 4}
                                y={0}
                                width="8"
                                height="100"
                                fill="transparent"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-crosshair"
                            />
                        </g>
                    ))}
                </svg>

                {/* Tooltip Overlay */}
                {hoveredIndex !== null && (
                    <div
                        className="absolute top-0 pointer-events-none transform -translate-x-1/2 flex flex-col items-center gap-1"
                        style={{ left: `${points[hoveredIndex].x}%`, top: `${points[hoveredIndex].y}%` }}
                    >
                        <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-sm shadow-xl mt-[-40px]">
                            <div className="text-[10px] text-zinc-400 font-mono mb-0.5">{points[hoveredIndex].label}</div>
                            <div className="text-xs font-bold text-white font-mono">${points[hoveredIndex].val}</div>
                        </div>
                        <div className="w-px h-full bg-white/20 absolute top-0 bottom-[-100px]"></div>
                    </div>
                )}
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between mt-2 pt-2 border-t border-white/5">
                {points.filter((_, i) => i % 2 === 0).map((p, i) => (
                    <div key={i} className="text-[9px] font-mono text-zinc-600">{p.label}</div>
                ))}
            </div>
        </div>
    );
}
