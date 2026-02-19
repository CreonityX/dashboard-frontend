"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, Briefcase, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
    { label: "Total Earnings", value: "$4,250", numericValue: 4250, prefix: "$", sub: "This Month", icon: DollarSign, color: "text-[#a3e635]" },
    { label: "Active Gigs", value: "3", numericValue: 3, prefix: "", sub: "In Progress", icon: Briefcase, color: "text-blue-500" },
    { label: "Pending", value: "$1,200", numericValue: 1200, prefix: "$", sub: "To be paid", icon: Clock, color: "text-yellow-500" },
    { label: "Unread", value: "5", numericValue: 5, prefix: "", sub: "Messages", icon: MessageSquare, color: "text-purple-500" },
];

function CountUpNumber({ target, prefix, duration = 1000 }: { target: number; prefix: string; duration?: number }) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;

        const start = performance.now();
        function update(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(target * eased));
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }, [inView, target, duration]);

    return (
        <span ref={ref}>
            {prefix}{value.toLocaleString()}
        </span>
    );
}

const cardVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: 0.15 + i * 0.07,
            duration: 0.4,
            ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        },
    }),
};

export function QuickStatsRow() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="tech-border p-4 transition-all duration-300 hover:bg-zinc-900/80 hover:border-zinc-700 group relative overflow-hidden hover-lift"
                >
                    <div className="absolute top-0 right-0 p-8 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className={cn("p-2 bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors", stat.color.replace('text-', 'text-'))}>
                            <stat.icon className="w-4 h-4" />
                        </div>
                        <div className="flex gap-0.5 opacity-20 group-hover:opacity-100 transition-opacity">
                            <div className="w-1 h-1 bg-white rounded-full" />
                            <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="text-2xl font-bold text-white font-mono mb-1 tracking-tighter">
                            <CountUpNumber target={stat.numericValue} prefix={stat.prefix} />
                        </div>
                        <div className="flex items-center justify-between border-t border-zinc-800/50 pt-2 mt-2">
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{stat.label}</div>
                            <div className="text-[9px] text-zinc-600 font-mono">{stat.sub}</div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
