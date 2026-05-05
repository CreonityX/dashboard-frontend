"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, HelpCircle, Command, ChevronRight, Home, Menu } from "lucide-react";
import { MOCK_CONVERSATIONS, SETTINGS_TABS, RESOURCE_TABS, SUPPORT_TABS, CALENDAR_VIEWS, PROFILE_TABS, ANALYTICS_TABS, FINANCE_TABS, PROJECT_TABS } from "@/lib/mock-data";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationCenter } from "../widgets/shared/os/NotificationCenter";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";


export function DashboardHeader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [showNotifications, setShowNotifications] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const { toggleMobileSidebar } = useSidebar();

    // Track scroll position for shadow
    useEffect(() => {
        const mainContent = document.querySelector("main .overflow-y-auto");
        if (!mainContent) return;

        function handleScroll() {
            setIsScrolled(mainContent!.scrollTop > 8);
        }
        mainContent.addEventListener("scroll", handleScroll, { passive: true });
        return () => mainContent.removeEventListener("scroll", handleScroll);
    }, []);

    // Breadcrumb Logic
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        let label = segment === 'messages' ? 'INBOX' : segment.replace(/-/g, ' ');
        return { label: label.toUpperCase(), href, isLink: true };
    });

    // Helper to add sub-level breadcrumb
    const getSubLevel = (paramName: string, tabs: any[], defaultId?: string) => {
        const param = searchParams.get(paramName);
        const targetId = param || defaultId;
        if (targetId) {
            const tabLabel = tabs.find(t => t.id === targetId)?.label;
            if (tabLabel) {
                return { label: tabLabel.toUpperCase(), href: '', isLink: false };
            }
        }
        return null;
    };

    // Handle Dynamic Sub-levels & Defaults
    if (pathname.includes('/settings')) {
        const sub = getSubLevel('tab', SETTINGS_TABS, 'account');
        if (sub) breadcrumbs.push(sub);
    }
    else if (pathname.includes('/resources')) {
        const sub = getSubLevel('tab', RESOURCE_TABS, 'best-practices');
        if (sub) breadcrumbs.push(sub);
    }
    else if (pathname.includes('/support')) {
        const sub = getSubLevel('tab', SUPPORT_TABS, 'help-center');
        if (sub) breadcrumbs.push(sub);
    }
    else if (pathname.includes('/calendar')) {
        const sub = getSubLevel('view', CALENDAR_VIEWS, 'month');
        if (sub) breadcrumbs.push(sub);
    }
    else if (pathname.includes('/profile')) {
        const sub = getSubLevel('tab', PROFILE_TABS, 'public');
        if (sub) breadcrumbs.push(sub);
    }
    else if (pathname.includes('/analytics')) {
        const sub = getSubLevel('tab', ANALYTICS_TABS, 'overview');
        if (sub) breadcrumbs.push(sub);
    }
    else if (pathname.includes('/finance')) {
        const sub = getSubLevel('tab', FINANCE_TABS, 'overview');
        if (sub) breadcrumbs.push(sub);
    }
    else if (pathname.includes('/projects')) {
        const sub = getSubLevel('tab', PROJECT_TABS, 'discover');
        if (sub) breadcrumbs.push(sub);
    }
    else if (pathname.includes('/messages')) {
        const convId = searchParams.get('conversation');
        if (convId) {
            const brand = MOCK_CONVERSATIONS.find(c => c.id === convId)?.brand;
            if (brand) {
                breadcrumbs.push({ label: brand.toUpperCase(), href: '', isLink: false });
            }
        }
    }

    // Close notifications when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className={cn(
            "h-16 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0 transition-shadow duration-300",
            isScrolled && "shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        )}>
            {/* Left: Hamburger & Breadcrumbs */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleMobileSidebar}
                    className="p-2 -ml-2 text-zinc-400 hover:text-white lg:hidden press-effect"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center gap-2 text-sm font-mono overflow-hidden whitespace-nowrap mask-linear-fade"
                >
                    <Link href="/" className="text-zinc-500 hover:text-white transition-colors shrink-0">
                        <Home className="w-4 h-4" />
                    </Link>
                    {breadcrumbs.length > 0 && <ChevronRight className="w-4 h-4 text-zinc-700 shrink-0" />}

                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        return (
                            <Fragment key={index}>
                                <div className="flex items-center gap-2 min-w-0">
                                    {crumb.isLink && !isLast ? (
                                        <Link
                                            href={crumb.href}
                                            className="text-zinc-500 hover:text-white transition-colors uppercase font-medium truncate"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className={cn(
                                            "uppercase transition-colors truncate",
                                            isLast ? "text-white font-bold" : "text-zinc-400 font-medium"
                                        )}>
                                            {crumb.label}
                                        </span>
                                    )}
                                    {!isLast && (
                                        <ChevronRight className="w-4 h-4 text-zinc-700 shrink-0" />
                                    )}
                                </div>
                            </Fragment>
                        );
                    })}
                </motion.div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4 relative shrink-0">
                <div className="relative group hidden sm:block">
                    <Search className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-colors duration-200",
                        searchFocused ? "text-[#a3e635]" : "text-zinc-500"
                    )} />
                    <input
                        type="text"
                        placeholder="SEARCH..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className={cn(
                            "bg-zinc-900/50 border border-zinc-800 rounded-sm py-1.5 pl-9 pr-4 text-xs text-white font-mono placeholder:text-zinc-700 outline-none transition-all duration-300",
                            searchFocused
                                ? "border-[#a3e635]/50 bg-zinc-900 w-64 shadow-[0_0_12px_rgba(163,230,53,0.08)]"
                                : "w-48 hover:border-zinc-700"
                        )}
                    />
                </div>

                <div className="h-4 w-px bg-zinc-800" />

                {/* Notification Bell */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={cn(
                            "relative group p-2 rounded-sm transition-all duration-200 press-effect",
                            showNotifications ? "bg-zinc-800 text-white" : "hover:bg-zinc-900 text-zinc-400 hover:text-white"
                        )}
                    >
                        <Bell className="w-4 h-4 transition-colors" />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#a3e635] rounded-full shadow-[0_0_4px_#a3e635]" />
                    </button>

                    {/* Notification Popover */}
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                transition={{ duration: 0.15, ease: [0.33, 1, 0.68, 1] }}
                                className="absolute right-0 top-full mt-2 w-[400px] max-h-[600px] overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl z-50"
                            >
                                <div className="p-0 max-h-[500px] overflow-y-auto custom-scrollbar">
                                    <NotificationCenter />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
                    <div className="text-right hidden md:block">
                        <div className="text-[10px] text-zinc-500 font-mono leading-none mb-1">SYSTEM</div>
                        <div className="text-[10px] font-bold text-[#a3e635] leading-none flex items-center gap-1">
                            <span className="w-1 h-1 bg-[#a3e635] rounded-full inline-block" />
                            ONLINE
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
