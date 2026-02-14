"use client";

import { Search, Bell, HelpCircle, Command, ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";

export function DashboardHeader() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <header className="h-16 z-10 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm font-mono">
                <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors">
                    <Home className="w-4 h-4" />
                </Link>
                {segments.length > 0 && (
                    <ChevronRight className="w-4 h-4 text-zinc-700" />
                )}
                {segments.map((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join('/')}`;
                    const isLast = index === segments.length - 1;

                    return (
                        <Fragment key={href}>
                            <Link
                                href={href}
                                className={`uppercase transition-colors ${isLast ? "text-white font-bold" : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {segment}
                            </Link>
                            {!isLast && (
                                <ChevronRight className="w-4 h-4 text-zinc-700" />
                            )}
                        </Fragment>
                    );
                })}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <div className="relative group hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-[#a3e635] transition-colors" />
                    <input
                        type="text"
                        placeholder="SEARCH..."
                        className="bg-zinc-900/50 border border-zinc-800 rounded-sm py-1.5 pl-9 pr-4 text-xs text-white font-mono placeholder:text-zinc-700 outline-none focus:border-[#a3e635]/50 focus:bg-zinc-900 w-48 transition-all focus:w-64"
                    />
                </div>

                <div className="h-4 w-px bg-zinc-800" />

                <button className="relative group p-2 hover:bg-zinc-900 rounded-sm transition-colors">
                    <Bell className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#a3e635] rounded-full" />
                </button>

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
