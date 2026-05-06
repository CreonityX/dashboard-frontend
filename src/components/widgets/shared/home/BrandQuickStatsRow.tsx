"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Wallet, CreditCard, MessageSquare, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CAMPAIGNS_LIST, WORKING_WITH_COLLABORATIONS, PENDING_PAYMENTS, PENDING_APPLICATIONS } from "@/lib/brand-data";
import { MOCK_BRAND_CONVERSATIONS } from "@/lib/brand-data";

const activeCampaigns = CAMPAIGNS_LIST.filter(c => c.status === 'active').length;
const totalCreators = WORKING_WITH_COLLABORATIONS.length;
const thisMonthSpend = 12500;
const pendingPayments = PENDING_PAYMENTS.reduce((s, p) => s + p.amount, 0);
const unreadMessages = MOCK_BRAND_CONVERSATIONS.reduce((s, c) => s + (c.unreadCount || 0), 0);
const applicationsQueue = PENDING_APPLICATIONS.length;

const STATS = [
    { label: "Active Campaigns", value: String(activeCampaigns), numericValue: activeCampaigns, prefix: "", sub: "Running", icon: Briefcase, color: "text-[#a3e635]", href: "/campaigns" },
    { label: "Creators Working", value: String(totalCreators), numericValue: totalCreators, prefix: "", sub: "With you", icon: Users, color: "text-blue-500", href: "/creators?tab=working" },
    { label: "This Month", value: `$${thisMonthSpend.toLocaleString()}`, numericValue: thisMonthSpend, prefix: "$", sub: "Spend", icon: Wallet, color: "text-amber-500", href: "/finance" },
    { label: "Pending Payments", value: `$${pendingPayments.toLocaleString()}`, numericValue: pendingPayments, prefix: "$", sub: "To creators", icon: CreditCard, color: "text-purple-500", href: "/finance" },
    { label: "Unread", value: String(unreadMessages), numericValue: unreadMessages, prefix: "", sub: "Messages", icon: MessageSquare, color: "text-zinc-400", href: "/messages" },
    { label: "Applications", value: String(applicationsQueue), numericValue: applicationsQueue, prefix: "", sub: "Review queue", icon: ClipboardList, color: "text-[#a3e635]", href: "/applications" },
];

function CountUpNumber({ target, prefix, duration = 1000 }: { target: number; prefix: string; duration?: number }) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {STATS.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                >
                    <Link href={stat.href} className="block tech-border p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 group relative overflow-hidden hover-lift">
                        <div className="absolute top-0 right-0 p-8 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="flex items-start justify-between mb-3 relative z-10">
                            <div className={cn("p-1.5 bg-zinc-950 border border-zinc-800 group-hover:border-zinc-600 transition-colors", stat.color)}>
                                <stat.icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex gap-0.5 opacity-0 group-hover:opacity-60 transition-opacity">
                                <div className="w-1 h-1 bg-zinc-500 rounded-sm" />
                                <div className="w-1 h-1 bg-zinc-500 rounded-sm" />
                            </div>
                        </div>
                        <div className="relative z-10">
                            <div className="text-xl font-bold text-white font-mono mb-1 tracking-tight">
                                <CountUpNumber target={stat.numericValue} prefix={stat.prefix} />
                            </div>
                            <div className="flex items-center justify-between border-t border-zinc-800/50 pt-2 mt-2">
                                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wide">{stat.label}</div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
