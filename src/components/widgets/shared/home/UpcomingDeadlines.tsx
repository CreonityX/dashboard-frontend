"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { DashboardWidgetShell } from "../DashboardWidgetShell";
import { DASHBOARD_UPCOMING_DEADLINES } from "@/lib/brand-data";
import Link from "next/link";

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.15 + i * 0.08,
            duration: 0.35,
            ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        },
    }),
};

export function UpcomingDeadlines() {
    return (
        <DashboardWidgetShell title="Upcoming Deadlines" icon={Calendar} delay={0.15} headerAction={<Link href="/content-review" className="text-[10px] font-mono text-[#a3e635] hover:underline">View</Link>}>
            <div className="p-4 space-y-2">
                {DASHBOARD_UPCOMING_DEADLINES.length === 0 ? (
                    <p className="text-[10px] font-mono text-zinc-500">No upcoming deadlines</p>
                ) : (
                    DASHBOARD_UPCOMING_DEADLINES.map((d, i) => (
                        <motion.div
                            key={d.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                        >
                            <Link href="/content-review" className="flex justify-between items-center p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm hover:border-zinc-700 transition-colors hover-lift">
                                <div>
                                    <div className="text-xs font-bold text-white">{d.creator}</div>
                                    <div className="text-[10px] font-mono text-zinc-500">{d.campaign} • {d.type}</div>
                                </div>
                                <span className="text-[10px] font-mono text-[#a3e635]">{d.dueDate}</span>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>
        </DashboardWidgetShell>
    );
}
