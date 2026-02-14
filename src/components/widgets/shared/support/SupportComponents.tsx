"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Play, CheckCircle2, Clock, AlertCircle } from "lucide-react";

// --- Section Header ---
export function SupportSection({ title, children, className, action }: { title: string, children: ReactNode, className?: string, action?: ReactNode }) {
    return (
        <div className={cn("space-y-4 mb-8 last:mb-0", className)}>
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">{title}</h3>
                {action}
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

// --- Ticket Row ---
export function TicketRow({ id, subject, status, date, priority }: { id: string, subject: string, status: 'open' | 'closed' | 'pending', date: string, priority: 'low' | 'medium' | 'high' }) {
    const statusColors = {
        open: "text-[#a3e635] bg-[#a3e635]/10 border-[#a3e635]/20",
        closed: "text-zinc-500 bg-zinc-800/50 border-zinc-700",
        pending: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
    };

    const priorityColors = {
        low: "text-zinc-500",
        medium: "text-yellow-500",
        high: "text-red-500"
    };

    return (
        <div className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-sm group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={cn("w-2 h-2 rounded-full", priorityColors[priority])} />
                <div>
                    <div className="text-xs font-mono text-zinc-500 mb-0.5">{id}</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors">{subject}</div>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-xs text-zinc-500 font-mono hidden md:block">{date}</div>
                <div className={cn("px-2 py-1 rounde-sm text-[10px] font-bold uppercase border", statusColors[status])}>
                    {status}
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
            </div>
        </div>
    );
}

// --- FAQ Item ---
export function FAQAccordion({ question, answer }: { question: string, answer: string }) {
    return (
        <details className="group border border-white/5 bg-zinc-900/20 rounded-sm open:bg-zinc-900/40 transition-colors">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-bold text-zinc-300 group-open:text-white group-hover:text-white transition-colors">{question}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="px-4 pb-4 pt-0 text-xs text-zinc-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                {answer}
            </div>
        </details>
    );
}

// --- Video Tutorial Card ---
export function VideoCard({ title, duration, category, thumbnail }: { title: string, duration: string, category: string, thumbnail?: string }) {
    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-video bg-zinc-900 rounded-sm overflow-hidden mb-3 border border-white/5 group-hover:border-[#a3e635]/50 transition-colors">
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white fill-current" />
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded-sm text-[10px] font-mono text-white">
                    {duration}
                </div>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors line-clamp-1">{title}</h4>
            <div className="text-[10px] text-zinc-500 font-mono uppercase mt-1">{category}</div>
        </div>
    );
}

// --- Status Row ---
export function StatusRow({ service, status, uptime }: { service: string, status: 'operational' | 'degraded' | 'outage', uptime: string }) {
    const statusConfig = {
        operational: { color: "text-[#a3e635]", label: "Operational", icon: CheckCircle2 },
        degraded: { color: "text-yellow-500", label: "Degraded Performance", icon: Clock },
        outage: { color: "text-red-500", label: "Major Outage", icon: AlertCircle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
            <span className="text-sm font-bold text-white">{service}</span>
            <div className="flex items-center gap-6">
                <span className="text-xs text-zinc-500 font-mono hidden md:block">{uptime} Uptime</span>
                <div className={cn("flex items-center gap-2 text-xs font-bold uppercase", config.color)}>
                    <Icon className="w-4 h-4" />
                    {config.label}
                </div>
            </div>
        </div>
    )
}
