"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { DashboardWidgetShell } from "../DashboardWidgetShell";
import { CAMPAIGN_CREATORS } from "@/lib/brand-data";
import Link from "next/link";

const topCreators = [...CAMPAIGN_CREATORS].sort((a, b) => parseInt((b.views || "0").replace(/\D/g, "")) - parseInt((a.views || "0").replace(/\D/g, ""))).slice(0, 4);

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

export function TopPerformingCreators() {
    return (
        <DashboardWidgetShell title="Top Performing Creators" icon={Star} delay={0.1} headerAction={<Link href="/creators" className="text-[10px] font-mono text-[#a3e635] hover:underline">View all</Link>}>
            <div className="p-4 space-y-2">
                {topCreators.map((c, i) => (
                    <motion.div
                        key={c.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                    >
                        <Link href={`/creators?tab=discover&creator=${c.creatorId}`} className="flex items-center gap-3 p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm hover:border-zinc-700 transition-colors hover-lift">
                            <span className="text-[10px] font-mono text-zinc-600 w-5">{i + 1}</span>
                            <div className="w-8 h-8 rounded-sm bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-[#a3e635]">{c.creator.substring(0, 2)}</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-white truncate">{c.creator}</div>
                                <div className="text-[10px] font-mono text-zinc-500">{c.views} views • {c.engagement}% eng</div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </DashboardWidgetShell>
    );
}
