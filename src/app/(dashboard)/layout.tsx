"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/dashboard/SidebarContext";
import { SettingsMvpProvider } from "@/components/widgets/shared/settings/SettingsMvpContext";
import { motion } from "framer-motion";
import { Suspense } from "react";

function HeaderFallback() {
    return (
        <div className="h-16 bg-zinc-950/80 border-b border-zinc-800 flex items-center px-6">
            <div className="h-3 w-24 skeleton rounded-sm" />
        </div>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SettingsMvpProvider>
            <SidebarProvider>
            <div className="flex bg-black font-sans h-screen overflow-hidden">
                <DashboardSidebar />
                <div className="flex-1 flex flex-col h-full relative z-0">
                    <Suspense fallback={<HeaderFallback />}>
                        <DashboardHeader />
                    </Suspense>
                    <main className="flex-1 overflow-y-auto relative bg-grid-zinc">
                        <div className="absolute inset-0 bg-black/95 pointer-events-none" />

                        <div className="relative z-10 h-full overflow-y-auto scroll-smooth custom-scrollbar">
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                                className="h-full"
                            >
                                {children}
                            </motion.div>
                        </div>
                    </main>
                </div>
            </div>
            </SidebarProvider>
        </SettingsMvpProvider>
    );
}
