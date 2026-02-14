"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/dashboard/SidebarContext";

import { Suspense } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex bg-black font-sans h-screen overflow-hidden">
                <DashboardSidebar />
                <div className="flex-1 flex flex-col h-full relative z-0">
                    <Suspense fallback={<div className="h-16 bg-zinc-950/80 border-b border-zinc-800" />}>
                        <DashboardHeader />
                    </Suspense>
                    <main className="flex-1 overflow-y-auto relative bg-grid-zinc">
                        <div className="absolute inset-0 bg-black/95 pointer-events-none" />

                        <div className="relative z-10 h-full overflow-y-auto scroll-smooth">
                            <div className="h-full">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
