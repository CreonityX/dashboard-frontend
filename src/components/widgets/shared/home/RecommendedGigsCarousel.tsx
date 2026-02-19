"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardWidgetShell } from "../DashboardWidgetShell";

const RECOMMENDED = [
    { id: 1, brand: "GoPro", title: "Action Cam Launch", match: 98, budget: "$2k - $4k", bg: "bg-blue-600" },
    { id: 2, brand: "Canon", title: "Creator Contest", match: 95, budget: "$5k Prize", bg: "bg-red-600" },
    { id: 3, brand: "Adobe", title: "Lightroom Tutorials", match: 92, budget: "$1.5k", bg: "bg-[#FF0000]" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: 0.2 + i * 0.08,
            duration: 0.4,
            ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        },
    }),
};

export function RecommendedGigsCarousel() {
    return (
        <DashboardWidgetShell
            title="Recommended_For_You"
            icon={Star}
            delay={0.15}
            headerAction={
                <div className="flex gap-1">
                    <button className="w-5 h-5 flex items-center justify-center border border-zinc-800 rounded-sm text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-xs press-effect">
                        &larr;
                    </button>
                    <button className="w-5 h-5 flex items-center justify-center border border-zinc-800 rounded-sm text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-xs press-effect">
                        &rarr;
                    </button>
                </div>
            }
        >
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {RECOMMENDED.map((gig, i) => (
                    <motion.div
                        key={gig.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                        className="tech-border p-5 group cursor-pointer hover:bg-zinc-900/50 transition-all duration-300 relative hover-lift"
                    >
                        {/* Hover bottom glow */}
                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#a3e635] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Match Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.08, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                            className="absolute top-0 right-0 bg-[#a3e635] text-black px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wide"
                        >
                            {gig.match}% Match
                        </motion.div>

                        <div className="flex items-center gap-3 mb-4 mt-2">
                            <div className={cn("w-10 h-10 flex items-center justify-center text-sm font-bold tracking-tighter border border-white/10 shadow-inner", gig.bg, "text-white")}>
                                {gig.brand[0]}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white font-display uppercase tracking-wider leading-none mb-1">{gig.brand}</div>
                                <div className="text-[9px] text-zinc-500 font-mono">VERIFIED_PARTNER</div>
                            </div>
                        </div>

                        <div className="text-xs text-zinc-300 font-medium mb-4 min-h-[32px] leading-relaxed group-hover:text-white transition-colors">
                            {gig.title}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-zinc-800 border-dashed">
                            <div className="text-[10px] text-[#a3e635] font-mono bg-[#a3e635]/5 px-1.5 py-0.5 rounded-sm border border-[#a3e635]/10">
                                {gig.budget}
                            </div>
                            <div className="w-6 h-6 flex items-center justify-center text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                                <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </DashboardWidgetShell>
    );
}
