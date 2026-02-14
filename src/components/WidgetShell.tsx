"use client";

import { ReactNode } from "react";
import { Maximize2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetShellProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    icon?: any;
    className?: string;
    indicatorState?: "active" | "idle" | "error";
    allowResize?: boolean;
}

export function WidgetShell({
    children,
    title,
    subtitle,
    icon: Icon,
    className,
    indicatorState = "active",
    allowResize = true
}: WidgetShellProps) {
    return (
        <div className={cn(
            "group relative border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-black/50 hover:z-10",
            allowResize && "resize-y min-h-[180px]",
            className
        )}>

            {/* 1. Industrial Frame */}
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5 relative z-10">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="w-6 h-6 flex items-center justify-center text-zinc-400">
                            <Icon className="w-4 h-4" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest font-display">{title}</h3>
                        {subtitle && <p className="text-[10px] text-zinc-500 font-mono hidden sm:block">{subtitle}</p>}
                    </div>
                </div>

                {/* Status Indicator (Dot Grid) & Controls */}
                <div className="flex items-center gap-4">
                    {/* The Dot Grid Indicator: Gray Gray Green */}
                    <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full shadow-[0_0_4px_currentColor]",
                            indicatorState === "active" ? "bg-[#a3e635] text-[#a3e635]" :
                                indicatorState === "error" ? "bg-red-500 text-red-500" : "bg-zinc-500 text-zinc-500"
                        )} />
                    </div>

                    {/* Corner Decoration */}
                    <div className="w-2 h-2 border-t border-r border-zinc-500/50" />
                </div>
            </div>

            {/* 2. Content */}
            <div className="flex-1 relative z-10 overflow-hidden">
                {children}
            </div>

            {/* 3. Bottom Utility Bar (Optional, for resize hint) */}
            {allowResize && (
                <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 border-b border-r border-zinc-500" />
                </div>
            )}

            {/* 4. Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

            {/* 5. Industrial Corner Brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-zinc-600 rounded-tl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-zinc-600 rounded-tr-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-zinc-600 rounded-bl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-zinc-600 rounded-br-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

        </div>
    );
}
