"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { DashboardWidgetShell } from "../DashboardWidgetShell";
import { PENDING_APPLICATIONS, WORKING_WITH_COLLABORATIONS } from "@/lib/brand-data";
import Link from "next/link";

const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.15 + i * 0.08,
            duration: 0.35,
            ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        },
    }),
};

export function CreatorPipelineWidget() {
    const pending = PENDING_APPLICATIONS.length;
    const working = WORKING_WITH_COLLABORATIONS.length;
    const completedThisMonth = 2;

    return (
        <DashboardWidgetShell title="Creator Pipeline" icon={Users} delay={0.15} headerAction={<Link href="/applications" className="text-[10px] font-mono text-[#a3e635] hover:underline">View</Link>}>
            <div className="p-4 space-y-4">
                <motion.div variants={itemVariants} initial="hidden" animate="visible" custom={0}>
                    <Link href="/applications?tab=pending" className="flex justify-between items-center p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm hover:border-amber-500/30 transition-colors hover-lift">
                        <span className="text-[10px] font-mono text-zinc-400">Applications pending review</span>
                        <span className="text-lg font-bold text-amber-400 font-mono">{pending}</span>
                    </Link>
                </motion.div>
                <motion.div variants={itemVariants} initial="hidden" animate="visible" custom={1}>
                    <Link href="/creators?tab=working" className="flex justify-between items-center p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm hover:border-[#a3e635]/30 transition-colors hover-lift">
                        <span className="text-[10px] font-mono text-zinc-400">Creators currently working</span>
                        <span className="text-lg font-bold text-[#a3e635] font-mono">{working}</span>
                    </Link>
                </motion.div>
                <motion.div variants={itemVariants} initial="hidden" animate="visible" custom={2}>
                    <div className="flex justify-between items-center p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <span className="text-[10px] font-mono text-zinc-400">Completed this month</span>
                        <span className="text-lg font-bold text-white font-mono">{completedThisMonth}</span>
                    </div>
                </motion.div>
            </div>
        </DashboardWidgetShell>
    );
}
