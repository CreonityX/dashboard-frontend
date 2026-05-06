"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wallet } from "lucide-react";
import { DashboardWidgetShell } from "../DashboardWidgetShell";
import { BUDGET_OVERVIEW } from "@/lib/brand-data";
import Link from "next/link";

function AnimatedBudgetBar({ value, index }: { value: number; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full h-10 flex flex-col justify-end rounded-t-[2px] overflow-hidden">
                <div
                    className="w-full bg-[#a3e635]/40 rounded-t-[2px]"
                    style={{
                        height: inView ? `${value}%` : '0%',
                        transition: `height 0.6s cubic-bezier(0.33, 1, 0.68, 1) ${0.3 + index * 0.08}s`,
                    }}
                />
            </div>
            <span className="text-[8px] font-mono text-zinc-600">{['N', 'D', 'J', 'F', 'M', 'A'][index]}</span>
        </div>
    );
}

function AnimatedProgressFill({ percentage }: { percentage: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="h-1.5 bg-zinc-800 rounded-[1px] overflow-hidden">
            <div
                className="h-full bg-[#a3e635] rounded-[1px]"
                style={{
                    width: inView ? `${Math.min(percentage, 100)}%` : '0%',
                    transition: 'width 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0.3s',
                }}
            />
        </div>
    );
}

export function BudgetOverviewWidget() {
    const pct = BUDGET_OVERVIEW.allocatedToInfluencer > 0 ? Math.round((BUDGET_OVERVIEW.spentYTD / BUDGET_OVERVIEW.allocatedToInfluencer) * 100) : 0;
    return (
        <DashboardWidgetShell title="Budget Overview" icon={Wallet} delay={0.1} headerAction={<Link href="/finance" className="text-[10px] font-mono text-[#a3e635] hover:underline">Details</Link>}>
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className="text-lg font-bold text-white font-mono">${(BUDGET_OVERVIEW.allocatedToInfluencer / 1000).toFixed(0)}K</div>
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Allocated</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className="text-lg font-bold text-[#a3e635] font-mono">${(BUDGET_OVERVIEW.spentYTD / 1000).toFixed(1)}K</div>
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Spent</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className="text-lg font-bold text-zinc-400 font-mono">${(BUDGET_OVERVIEW.remaining / 1000).toFixed(1)}K</div>
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Remaining</div>
                    </motion.div>
                </div>
                <div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
                        <span>Spent to date</span>
                        <span>{pct}%</span>
                    </div>
                    <AnimatedProgressFill percentage={pct} />
                </div>
                <div className="flex items-end gap-1.5">
                    {[50, 58, 62, 65, 70, 72].map((val, i) => (
                        <AnimatedBudgetBar key={i} value={val} index={i} />
                    ))}
                </div>
            </div>
        </DashboardWidgetShell>
    );
}
