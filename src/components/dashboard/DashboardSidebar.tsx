"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    Wallet,
    Calendar,
    Settings,
    ChevronLeft,
    ChevronRight,
    LifeBuoy,
    GraduationCap,
    BarChart3,
    X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { TechIcon } from "../TechIcon";

const MAIN_NAV_ITEMS = [
    { label: "DASHBOARD", icon: LayoutDashboard, href: "/" },
    { label: "PROJECTS", icon: Briefcase, href: "/projects" },
    { label: "MESSAGES", icon: MessageSquare, href: "/messages" },
    { label: "ANALYTICS", icon: BarChart3, href: "/analytics" },
    { label: "FINANCE", icon: Wallet, href: "/finance" },
    { label: "CALENDAR", icon: Calendar, href: "/calendar" },
];

const BOTTOM_NAV_ITEMS = [
    { label: "SETTINGS", icon: Settings, href: "/settings" },
    { label: "RESOURCES", icon: GraduationCap, href: "/resources" },
    { label: "SUPPORT", icon: LifeBuoy, href: "/support" },
];

type NavItem = (typeof MAIN_NAV_ITEMS)[number];

function NavGroup({
    items,
    pathname,
    isCollapsed,
    closeMobileSidebar,
}: {
    items: NavItem[];
    pathname: string;
    isCollapsed: boolean;
    closeMobileSidebar: () => void;
}) {
    return (
        <div className="space-y-0.5">
            {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block"
                        onClick={closeMobileSidebar}
                    >
                        <div
                            className={cn(
                                "flex items-center px-6 py-3 group relative overflow-hidden border-l-2",
                                isActive
                                    ? "border-[#a3e635] bg-white/5 text-white"
                                    : "border-transparent text-zinc-500 hover:text-white hover:bg-white/[0.03]"
                            )}>
                            {/* Active background glow */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#a3e635]/[0.07] to-transparent pointer-events-none" />
                            )}

                            <TechIcon
                                icon={item.icon}
                                isActive={isActive}
                                className={cn("w-5 h-5 shrink-0 mr-3 relative z-10", isActive ? "text-[#a3e635]" : "text-zinc-500 group-hover:text-white")}
                            />

                            <span className={cn(
                                "text-xs font-mono tracking-wide relative z-10",
                                isCollapsed && "lg:opacity-0 lg:w-0 lg:translate-x-10"
                            )}>
                                {item.label}
                            </span>

                            {/* Hover indicator line */}
                            <div className={cn(
                                "absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-zinc-600",
                                !isActive && "group-hover:h-4"
                            )} />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export function DashboardSidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar, isMobileOpen, closeMobileSidebar } = useSidebar();

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                        onClick={closeMobileSidebar}
                    />
                )}
            </AnimatePresence>

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 h-screen flex flex-col shrink-0 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group/sidebar",
                    "border-r border-zinc-800 bg-zinc-900/95 backdrop-blur-xl",
                    "lg:relative lg:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    isCollapsed ? "lg:w-20" : "lg:w-64",
                    "w-64"
                )}
            >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a3e635]/20 to-transparent" />

                {/* Logo & Collapse Header */}
                <div className="h-16 flex items-center px-6 border-b border-white/5 relative z-10 justify-between">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-zinc-900/50 rounded-sm flex items-center justify-center shrink-0 border border-zinc-800 shadow-inner">
                            <div className="w-4 h-4 bg-[#a3e635] rounded-full shadow-[0_0_8px_#a3e635] animate-pulse-glow" />
                        </div>
                        <span className={cn(
                            "ml-3 font-display font-bold text-white tracking-tight transition-all duration-300",
                            isCollapsed && "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                        )}>
                            CREONITY
                        </span>
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className={cn(
                            "text-zinc-500 hover:text-white transition-all duration-200 p-1.5 rounded-sm hover:bg-white/5 hidden lg:block press-effect",
                            isCollapsed ? "hidden" : "block"
                        )}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    {isCollapsed && (
                        <button
                            onClick={toggleSidebar}
                            className="hidden lg:flex absolute inset-0 w-full h-full items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 z-20"
                        >
                            <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col py-6 px-0 overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar">
                    <div className="flex-1">
                        <NavGroup
                            items={MAIN_NAV_ITEMS}
                            pathname={pathname}
                            isCollapsed={isCollapsed}
                            closeMobileSidebar={closeMobileSidebar}
                        />
                    </div>

                    {/* Promo Box */}
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <SidebarPromoBox />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div>
                        <NavGroup
                            items={BOTTOM_NAV_ITEMS}
                            pathname={pathname}
                            isCollapsed={isCollapsed}
                            closeMobileSidebar={closeMobileSidebar}
                        />
                    </div>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-white/5 relative z-10">
                    <Link href="/profile" className={cn(
                        "flex items-center gap-3 transition-all duration-300 group",
                        isCollapsed ? "lg:justify-center" : ""
                    )}>
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-[#a3e635] transition-colors relative">
                            <span className="text-[10px] font-bold text-white">KZ</span>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#a3e635] border-2 border-zinc-900 rounded-full" />
                        </div>
                        <div className={cn(
                            "transition-all duration-300 overflow-hidden whitespace-nowrap",
                            isCollapsed ? "lg:opacity-0 lg:w-0" : "opacity-100 w-auto"
                        )}>
                            <div className="text-xs font-bold text-white font-display group-hover:text-[#a3e635] transition-colors">Kai_Zen</div>
                            <div className="text-[10px] text-zinc-500 font-mono">CREATOR_PRO</div>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
}

function SidebarPromoBox() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="px-4 mb-4 mt-auto">
            <div className="relative p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm overflow-hidden group hover:border-zinc-700 transition-colors">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-1.5 right-1.5 p-1 text-zinc-600 hover:text-white transition-colors z-10"
                >
                    <X className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1 h-1 bg-[#a3e635] rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-[#a3e635] uppercase tracking-wider font-mono">Pro_Offer</span>
                </div>

                <h4 className="text-xs font-bold text-white leading-tight mb-0.5 font-display">UPGRADE_NOW</h4>
                <p className="text-[9px] text-zinc-500 font-mono mb-2 leading-tight">50% off your first 3 months.</p>

                <button className="w-full py-1 bg-[#a3e635] hover:bg-[#a3e635]/90 text-black text-[9px] font-bold uppercase tracking-wider rounded-[1px] transition-all flex items-center justify-center gap-1 press-effect hover:shadow-[0_0_12px_rgba(163,230,53,0.3)]">
                    Claim_Offer
                </button>
            </div>
        </div>
    );
}
