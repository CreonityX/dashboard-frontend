"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle2, MessageSquare, Briefcase, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardWidgetShell } from "../DashboardWidgetShell";

const ACTIVITIES = [
    { id: 1, type: "payment", text: "Received payment from Samsung", time: "2h ago", icon: CheckCircle2, color: "text-[#a3e635]" },
    { id: 2, type: "message", text: "New message from Adidas", time: "4h ago", icon: MessageSquare, color: "text-blue-500" },
    { id: 3, type: "gig", text: "Applied to Sephora Campaign", time: "Yesterday", icon: Briefcase, color: "text-purple-500" },
    { id: 4, type: "file", text: "Uploaded draft for Nike", time: "Yesterday", icon: FileText, color: "text-zinc-400" },
];

const itemVariants = {
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

export function RecentActivityFeed() {
    return (
        <DashboardWidgetShell title="Recent_Activity" icon={Activity} className="h-full" delay={0.2}>
            <div className="p-6 h-full relative">
                <div className="space-y-6 relative h-full">
                    {/* Vertical Timeline Line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-zinc-800 origin-top"
                    />

                    {ACTIVITIES.map((act, i) => (
                        <motion.div
                            key={act.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            className="flex gap-4 relative group"
                        >
                            <div className={cn("w-10 h-10 border border-zinc-800 bg-zinc-950 flex items-center justify-center z-10 shrink-0 relative group-hover:border-zinc-700 transition-colors", act.color)}>
                                <div className="absolute inset-0 bg-current opacity-5 group-hover:opacity-10 transition-opacity" />
                                <act.icon className="w-4 h-4 relative z-10" />
                            </div>
                            <div className="pt-1">
                                <div className="text-xs text-zinc-300 font-medium leading-tight mb-1 group-hover:text-white transition-colors">{act.text}</div>
                                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wide">{act.time}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardWidgetShell>
    );
}
