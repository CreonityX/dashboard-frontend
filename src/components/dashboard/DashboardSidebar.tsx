"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    Wallet,
    Settings,
    ChevronLeft,
    ChevronRight,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { TechIcon } from "../TechIcon";

const NAV_ITEMS = [
    { label: "DASHBOARD", icon: LayoutDashboard, href: "/dashboard" },
    { label: "PROJECTS", icon: Briefcase, href: "/dashboard/projects" },
    { label: "MESSAGES", icon: MessageSquare, href: "/dashboard/messages" },
    { label: "FINANCE", icon: Wallet, href: "/dashboard/finance" },
    { label: "SETTINGS", icon: Settings, href: "/dashboard/settings" },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <aside
            className={cn(
                "relative z-20 h-screen flex flex-col transition-all duration-300 ease-in-out group/sidebar",
                "border-r border-zinc-800 bg-zinc-900/40 backdrop-blur-md",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* 1. Background Effects (Widget Style) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

            {/* 2. Industrial Corner Accents (Right Side Only) */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-500/50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500/50 pointer-events-none" />

            {/* 3. Logo Section */}
            <div className="h-16 flex items-center px-6 border-b border-white/5 relative z-10">
                <div className="w-8 h-8 bg-zinc-900/50 rounded-sm flex items-center justify-center shrink-0 border border-zinc-800 shadow-inner">
                    <div className="w-4 h-4 bg-[#a3e635] rounded-full shadow-[0_0_8px_#a3e635]" />
                </div>
                <span className={cn(
                    "ml-3 font-display font-bold text-white tracking-tight transition-opacity duration-300",
                    isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                )}>
                    CREONITY
                </span>
            </div>

            {/* 4. Navigation */}
            <nav className="flex-1 py-6 px-0 space-y-1 overflow-y-auto overflow-x-hidden relative z-10">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block"
                        >
                            <div className={cn(
                                "flex items-center px-6 py-3 transition-all group relative overflow-hidden border-l-2",
                                isActive
                                    ? "border-[#a3e635] bg-white/5 text-white"
                                    : "border-transparent text-zinc-500 hover:text-white hover:bg-white/5"
                            )}>
                                <TechIcon
                                    icon={item.icon}
                                    isActive={isActive}
                                    className={cn("w-5 h-5 shrink-0 mr-3", isActive ? "text-[#a3e635]" : "text-zinc-500 group-hover:text-white")}
                                />

                                <span className={cn(
                                    "text-xs font-mono tracking-wide transition-all duration-300",
                                    isCollapsed ? "opacity-0 w-0 translate-x-10" : "opacity-100 translate-x-0"
                                )}>
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* 5. Footer / Collapse */}
            <div className="p-3 border-t border-white/5 relative z-10">
                <button
                    onClick={toggleSidebar}
                    className="w-full flex items-center justify-center p-2 rounded-sm hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* 6. User Profile (Mini) */}
            <div className="p-4 border-t border-white/5 relative z-10">
                <div className={cn(
                    "flex items-center gap-3 transition-all duration-300",
                    isCollapsed ? "justify-center" : ""
                )}>
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-white">KZ</span>
                    </div>
                    <div className={cn(
                        "transition-opacity duration-300 overflow-hidden whitespace-nowrap",
                        isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                    )}>
                        <div className="text-xs font-bold text-white font-display">Kai_Zen</div>
                        <div className="text-[10px] text-zinc-500 font-mono">CREATOR_PRO</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
