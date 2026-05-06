"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bell, Calendar, Wallet } from "lucide-react";
import { DashboardWidgetShell } from "../DashboardWidgetShell";
import { AlertsSection } from "./AlertsSection";
import { BUDGET_OVERVIEW } from "@/lib/brand-data";

interface HomeShellProps {
    children?: ReactNode;
}

export function HomeShell({ children }: HomeShellProps) {
    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                <main className="flex-1 overflow-y-auto custom-scrollbar relative backdrop-blur-md flex flex-col lg:order-1">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />
                    <div className="flex-1 p-4 lg:p-6 space-y-6 relative z-10 max-w-6xl mx-auto w-full">
                        {children}
                        <div className="xl:hidden flex flex-col gap-6 mt-6 border-t border-zinc-800 pt-6">
                            <MobileSidebar />
                        </div>
                    </div>
                </main>
                <motion.aside
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    className="w-80 flex-shrink-0 bg-zinc-900/60 border-l border-zinc-800 overflow-y-auto p-6 space-y-6 hidden xl:block lg:order-2 custom-scrollbar"
                >
                    <SidebarContent />
                </motion.aside>
            </div>
        </div>
    );
}

function AnimatedBudgetProgress({ percentage }: { percentage: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="h-1.5 bg-zinc-800 rounded-[1px] overflow-hidden">
            <div
                className="h-full bg-[#a3e635] rounded-[1px]"
                style={{
                    width: inView ? `${percentage}%` : '0%',
                    transition: 'width 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0.3s',
                }}
            />
        </div>
    );
}

function AnimatedMiniBar({ height, index }: { height: number; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className={cn(
            "text-[11px] py-1 font-mono transition-colors text-center",
            index === 15 ? "bg-[#a3e635] text-black font-bold" : "text-zinc-500 hover:text-zinc-300"
        )}>
            {index + 1}
        </div>
    );
}

function SidebarContent() {
    const pct = BUDGET_OVERVIEW.allocatedToInfluencer > 0 ? Math.round((BUDGET_OVERVIEW.spentYTD / BUDGET_OVERVIEW.allocatedToInfluencer) * 100) : 0;
    return (
        <>
            <DashboardWidgetShell title="Budget" icon={Wallet} className="min-h-0" delay={0.25}>
                <div className="p-4 space-y-3">
                    <div className="flex items-baseline justify-between">
                        <span className="text-xl font-bold text-white font-mono tracking-tight">${(BUDGET_OVERVIEW.spentYTD / 1000).toFixed(1)}K</span>
                        <span className="text-xs text-zinc-600 font-mono">/ ${(BUDGET_OVERVIEW.allocatedToInfluencer / 1000).toFixed(0)}K</span>
                    </div>
                    <AnimatedBudgetProgress percentage={pct} />
                    <div className="text-[10px] text-zinc-600 font-mono">Spent {pct}% of allocated</div>
                </div>
            </DashboardWidgetShell>
            <DashboardWidgetShell title="Schedule" icon={Calendar} className="min-h-0" delay={0.3}>
                <div className="p-3">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-3 text-center">Feb 2026</div>
                    <div className="grid grid-cols-7 gap-px mb-1">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <div key={i} className="text-[9px] text-zinc-600 font-mono text-center py-1">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className={cn(
                                "text-[11px] py-1 font-mono transition-colors text-center",
                                i === 15 ? "bg-[#a3e635] text-black font-bold" : "text-zinc-500 hover:text-zinc-300"
                            )}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </DashboardWidgetShell>
            <DashboardWidgetShell title="Alerts" icon={Bell} className="min-h-0" delay={0.35}>
                <div className="p-4">
                    <AlertsSection showTitle={false} />
                </div>
            </DashboardWidgetShell>
        </>
    );
}

function MobileSidebar() {
    return <SidebarContent />;
}
