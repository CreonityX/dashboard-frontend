"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Star, MoreHorizontal } from "lucide-react";

// --- Section Header ---
export function ProfileSection({ title, children, className, action }: { title: string, children: ReactNode, className?: string, action?: ReactNode }) {
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

// --- Rate Card Item ---
export function RateCardItem({ title, price, unit = "post", negotiable = false }: { title: string, price: string, unit?: string, negotiable?: boolean }) {
    return (
        <div className="p-4 border border-white/5 bg-white/[0.02] rounded-sm hover:border-[#a3e635]/30 hover:bg-[#a3e635]/5 transition-all group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-zinc-300 font-mono uppercase truncate">{title}</span>
                {negotiable && <span className="text-[9px] px-1.5 py-0.5 bg-zinc-800 text-zinc-500 rounded-sm uppercase tracking-tighter">Negotiable</span>}
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-white font-display group-hover:text-[#a3e635] transition-colors">{price}</span>
                <span className="text-[10px] text-zinc-600 font-mono">/{unit}</span>
            </div>
        </div>
    );
}

// --- Portfolio Item ---
export function PortfolioItem({ title, image, stats }: { title: string, image: string, stats?: string }) {
    return (
        <div className="aspect-square relative group overflow-hidden bg-zinc-900 border border-white/5 rounded-sm cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-100" style={{ backgroundImage: `url(${image})` }} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/80 backdrop-blur-sm border-t border-white/10">
                <h4 className="text-xs font-bold text-white truncate text-shadow-sm">{title}</h4>
                {stats && <p className="text-[10px] text-[#a3e635] font-mono mt-0.5">{stats}</p>}
            </div>
        </div>
    );
}

// --- Review Card ---
export function ReviewCard({ author, rating, text, date }: { author: string, rating: number, text: string, date: string }) {
    return (
        <div className="p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm space-y-3">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-700" />
                    <span className="text-xs font-bold text-zinc-300">{author}</span>
                </div>
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={cn("w-3 h-3", i <= rating ? "text-[#a3e635] fill-current" : "text-zinc-700")} />
                    ))}
                </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed italic">"{text}"</p>
            <div className="text-[10px] text-zinc-600 font-mono text-right">{date}</div>
        </div>
    );
}
