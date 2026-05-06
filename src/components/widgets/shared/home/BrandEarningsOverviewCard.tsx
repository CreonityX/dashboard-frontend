"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { DashboardWidgetShell } from "../DashboardWidgetShell";

function CountUpValue({ target, prefix = "$" }: { target: number; prefix?: string }) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        const start = performance.now();
        const duration = 1200;
        function update(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(target * eased));
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }, [inView, target]);

    return <span ref={ref}>{prefix}{value.toLocaleString()}.00</span>;
}

function AnimatedBar({ height, index }: { height: number; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div
            ref={ref}
            className="flex-1 bg-zinc-800/50 hover:bg-[#a3e635] transition-colors relative group border-t border-x border-zinc-700/30 hover:border-transparent"
            style={{
                height: inView ? `${height}%` : '0%',
                transition: `height 0.6s cubic-bezier(0.33, 1, 0.68, 1) ${0.2 + index * 0.05}s`,
            }}
        >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[9px] px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-800 z-20 pointer-events-none">
                ${height * 100}
            </div>
        </div>
    );
}

export function EarningsOverviewCard() {
    return (
        <DashboardWidgetShell
            title="Revenue_Flow"
            icon={TrendingUp}
            className="h-full min-h-[280px]"
            headerAction={
                <button className="text-[10px] text-zinc-500 hover:text-white font-mono uppercase flex items-center gap-1 transition-colors press-effect">
                    Report <ArrowUpRight className="w-3 h-3" />
                </button>
            }
        >
            <div className="p-6 h-full flex flex-col justify-between relative">
                <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-white font-mono">
                            <CountUpValue target={12450} />
                        </span>
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                            className="text-xs text-[#a3e635] font-mono bg-[#a3e635]/10 px-1.5 py-0.5 rounded-sm"
                        >
                            +24%
                        </motion.span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-4">Total Earnings (This Year)</div>
                </div>

                {/* Bars Visualization */}
                <div className="flex items-end justify-between gap-1 h-32 relative z-10 border-b border-zinc-800/50 pb-1">
                    <div className="absolute inset-0 bg-grid-zinc opacity-10 pointer-events-none" />
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                        <AnimatedBar key={i} height={h} index={i} />
                    ))}
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-32 bg-[#a3e635] opacity-[0.03] blur-3xl rounded-full pointer-events-none" />
            </div>
        </DashboardWidgetShell>
    );
}
