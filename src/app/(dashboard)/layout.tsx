"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/dashboard/SidebarContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex bg-black font-sans min-h-screen">
                <DashboardSidebar />
                <div className="flex-1 flex flex-col min-h-screen relative z-0">
                    <DashboardHeader />
                    <main className="flex-1 overflow-y-auto relative bg-grid-zinc">
                        <div className="absolute inset-0 bg-black/95 pointer-events-none" />

                        {/* Neo-Industrial Container */}
                        <div className="relative z-10 p-6 h-[calc(100vh-64px)] overflow-hidden">
                            <div className="h-full w-full rounded-tl-2xl border border-white/5 bg-zinc-900/20 shadow-2xl relative overflow-hidden flex flex-col">

                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 rounded-tl-2xl pointer-events-none" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 pointer-events-none" />

                                {/* Content Scroll Area */}
                                <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
