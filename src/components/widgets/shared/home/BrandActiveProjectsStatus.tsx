"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardWidgetShell } from "../DashboardWidgetShell";
import Link from "next/link";

const ACTIVE_GIGS = [
    { id: 1, brand: "Nike", title: "Air Max Campaign", progress: 75, due: "2d", color: "bg-white" },
    { id: 2, brand: "Samsung", title: "S26 Review", progress: 40, due: "5d", color: "bg-blue-600" },
    { id: 3, brand: "Spotify", title: "Podcast Promo", progress: 15, due: "1w", color: "bg-[#1DB954]" },
];

const gigVariants = {
    hidden: { opacity: 0, x: -16 },
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

function AnimatedProgressBar({ progress, index }: { progress: number; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="h-1.5 w-full bg-zinc-900 border border-zinc-800/50 p-[1px]">
            <div
                className="h-full bg-zinc-600 group-hover:bg-[#a3e635] transition-colors relative"
                style={{
                    width: inView ? `${progress}%` : '0%',
                    transition: `width 0.8s cubic-bezier(0.33, 1, 0.68, 1) ${0.3 + index * 0.1}s`,
                }}
            >
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/50" />
            </div>
        </div>
    );
}

export function ActiveProjectsStatus() {
    return (
        <DashboardWidgetShell
            title="Active_Gigs"
            icon={Zap}
            className="h-full"
            delay={0.1}
            headerAction={
                <span className="text-[9px] text-blue-500 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded-sm border border-blue-500/20">3 LIVE</span>
            }
        >
            <div className="p-6 flex flex-col h-full">
                <div className="space-y-6 flex-1">
                    {ACTIVE_GIGS.map((gig, i) => (
                        <motion.div
                            key={gig.id}
                            variants={gigVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            className="group cursor-pointer"
                        >
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-2 h-2 rounded-full", gig.color)} />
                                    <div>
                                        <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{gig.title}</div>
                                        <div className="text-[9px] text-zinc-500 font-mono uppercase">{gig.brand}</div>
                                    </div>
                                </div>
                                <div className="text-[10px] text-zinc-400 font-mono">Due in {gig.due}</div>
                            </div>
                            <AnimatedProgressBar progress={gig.progress} index={i} />
                        </motion.div>
                    ))}
                </div>

                <Link href="/campaigns" className="w-full mt-6 py-2 border border-zinc-800 hover:border-zinc-600 bg-zinc-950 hover:bg-zinc-900 text-[10px] text-zinc-400 hover:text-white font-mono uppercase transition-all flex items-center justify-center gap-2 group relative overflow-hidden press-effect">
                    <span className="relative z-10 flex items-center gap-2">View All Projects <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                </Link>
            </div>
        </DashboardWidgetShell>
    );
}
