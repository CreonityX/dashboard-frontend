"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, HelpCircle, Command, ChevronRight, Home } from "lucide-react";
import { MOCK_CONVERSATIONS, SETTINGS_TABS, RESOURCE_TABS, SUPPORT_TABS, CALENDAR_VIEWS, PROFILE_TABS, ANALYTICS_TABS } from "@/lib/mock-data";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { NotificationCenter } from "../widgets/shared/os/NotificationCenter";
import { cn } from "@/lib/utils";


export function DashboardHeader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

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
        const targetId = param || defaultId; // Use param or fallback to default
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
        const sub = getSubLevel('tab', RESOURCE_TABS, 'courses');
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
        <header className="h-16 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm font-mono">
                <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
                    <Home className="w-4 h-4" />
                </Link>
                {breadcrumbs.length > 0 && <ChevronRight className="w-4 h-4 text-zinc-700" />}

                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <Fragment key={index}>
                            <div className="flex items-center gap-2">
                                {crumb.isLink && !isLast ? (
                                    <Link
                                        href={crumb.href}
                                        className="text-zinc-500 hover:text-white transition-colors uppercase font-medium"
                                    >
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className={cn(
                                        "uppercase transition-colors",
                                        isLast ? "text-white font-bold" : "text-zinc-400 font-medium"
                                    )}>
                                        {crumb.label}
                                    </span>
                                )}
                                {!isLast && (
                                    <ChevronRight className="w-4 h-4 text-zinc-700" />
                                )}
                            </div>
                        </Fragment>
                    );
                })}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4 relative">
                <div className="relative group hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-[#a3e635] transition-colors" />
                    <input
                        type="text"
                        placeholder="SEARCH..."
                        className="bg-zinc-900/50 border border-zinc-800 rounded-sm py-1.5 pl-9 pr-4 text-xs text-white font-mono placeholder:text-zinc-700 outline-none focus:border-[#a3e635]/50 focus:bg-zinc-900 w-48 transition-all focus:w-64"
                    />
                </div>

                <div className="h-4 w-px bg-zinc-800" />

                {/* Notification Bell with Popover */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={cn(
                            "relative group p-2 rounded-sm transition-colors",
                            showNotifications ? "bg-zinc-800 text-white" : "hover:bg-zinc-900 text-zinc-400 hover:text-white"
                        )}
                    >
                        <Bell className="w-4 h-4 transition-colors" />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#a3e635] rounded-full" />
                    </button>

                    {/* Popover Banner */}
                    {showNotifications && (
                        <div className="absolute right-0 top-full mt-2 w-[400px] max-h-[600px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-0 max-h-[500px] overflow-y-auto custom-scrollbar">
                                <NotificationCenter />
                            </div>

                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
                    <div className="text-right hidden md:block">
                        <div className="text-[10px] text-zinc-500 font-mono leading-none mb-1">SYSTEM</div>
                        <div className="text-[10px] font-bold text-[#a3e635] leading-none">ONLINE</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
