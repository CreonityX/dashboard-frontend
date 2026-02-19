"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bell, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import { DashboardWidgetShell } from "../DashboardWidgetShell";

interface HomeShellProps {
    children?: ReactNode;
}

export function HomeShell({ children }: HomeShellProps) {
    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative backdrop-blur-md flex flex-col lg:order-1">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

                    <div className="flex-1 p-4 lg:p-6 space-y-6 relative z-10 max-w-6xl mx-auto w-full">
                        {children}

                        {/* Mobile Widgets */}
                        <div className="xl:hidden flex flex-col gap-6 mt-6 border-t border-zinc-800 pt-6">
                            <MobileRightSidebar />
                        </div>
                    </div>
                </main>

                {/* Desktop Right Sidebar */}
                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    className="w-80 flex-shrink-0 bg-zinc-900/60 border-l border-zinc-800 overflow-y-auto p-6 space-y-6 hidden xl:block lg:order-2 custom-scrollbar"
                >
                    <SidebarWidgetsContent />
                </motion.aside>
            </div>
        </div>
    );
}

function SidebarWidgetsContent() {
    return (
        <>
            {/* Mini Calendar Widget */}
            <DashboardWidgetShell title="Schedule" icon={Calendar} className="min-h-0" delay={0.35}>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">FEB 2026</div>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <div key={i} className="text-[10px] text-zinc-600 font-mono">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className={cn(
                                "text-xs p-1.5 rounded-sm hover:bg-zinc-800 cursor-pointer font-mono transition-all duration-150",
                                i === 14 ? "bg-[#a3e635] text-black font-bold shadow-[0_0_10px_rgba(163,230,53,0.3)]" : "text-zinc-400 hover:text-white",
                                [5, 12, 18, 25].includes(i) && i !== 14 ? "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#a3e635] after:rounded-full" : ""
                            )}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </DashboardWidgetShell>

            {/* Quick Earnings */}
            <DashboardWidgetShell title="Earnings" icon={TrendingUp} className="min-h-0" delay={0.45}>
                <div className="p-4">
                    <div className="text-3xl font-bold text-white font-mono mb-2 tracking-tighter">$12,450<span className="text-zinc-600 text-lg">.00</span></div>
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5 bg-zinc-950/50 px-2 py-1 rounded-sm border border-zinc-800">
                            <span className="text-[#a3e635] font-bold">+15%</span> vs last month
                        </div>
                        <div className="h-8 w-16 flex items-end justify-between gap-0.5 opacity-50">
                            {[20, 40, 30, 70, 50, 80].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ delay: 0.6 + i * 0.06, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                                    className="w-2 bg-[#a3e635]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </DashboardWidgetShell>

            {/* Profile Meter */}
            <DashboardWidgetShell title="Profile" icon={CheckCircle2} className="min-h-0" delay={0.55}>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] text-zinc-400 font-mono uppercase">Completion Status</span>
                        <span className="text-xs font-bold text-[#a3e635] font-mono">85%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-950 border border-zinc-800 rounded-full overflow-hidden mb-3 relative">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ delay: 0.7, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            className="h-full bg-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.5)] relative"
                        >
                            <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-white/50" />
                        </motion.div>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-mono border-t border-zinc-800 pt-3">
                        Complete your <span className="text-zinc-300 hover:text-white cursor-pointer hover:underline decoration-[#a3e635] transition-colors">bio section</span> to reach 100%
                    </p>
                </div>
            </DashboardWidgetShell>
        </>
    )
}

function MobileRightSidebar() {
    return <SidebarWidgetsContent />;
}
