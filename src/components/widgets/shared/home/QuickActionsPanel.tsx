"use client";

import { motion } from "framer-motion";
import { Plus, Search, ClipboardList, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ACTIONS = [
    { label: "Create new campaign", icon: Plus, href: "/campaigns", primary: true },
    { label: "Find creators", icon: Search, href: "/creators?tab=discover", primary: false },
    { label: "Review applications", icon: ClipboardList, href: "/applications?tab=pending", primary: false },
    { label: "Approve content", icon: CheckCircle, href: "/content-review", primary: false },
];

const actionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.1 + i * 0.06,
            duration: 0.3,
            ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        },
    }),
};

export function QuickActionsPanel() {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
            <h3 className="text-[10px] font-bold text-zinc-500 font-display tracking-widest uppercase mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
                {ACTIONS.map((a, i) => (
                    <motion.div
                        key={a.label}
                        variants={actionVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                    >
                        <Link
                            href={a.href}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] font-mono transition-colors press-effect",
                                a.primary ? "bg-[#a3e635] text-black font-bold hover:bg-[#b5f045] hover:shadow-[0_0_12px_rgba(163,230,53,0.3)]" : "bg-zinc-950/50 border border-zinc-800 text-zinc-400 hover:border-[#a3e635]/50 hover:text-[#a3e635]"
                            )}
                        >
                            <a.icon className="w-4 h-4 shrink-0" />
                            {a.label}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
