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

                        {/* Simplified Content Area */}
                        <div className="relative z-10 h-full overflow-y-auto scroll-smooth">
                            <div className="p-6 min-h-full">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
