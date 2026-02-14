"use client";

import { SupportSection, StatusRow } from "@/components/widgets/shared/support/SupportComponents";
import { Activity, CheckCircle2 } from "lucide-react";

export function PlatformStatus() {
    return (
        <div className="max-w-3xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            {/* Overall Health */}
            <div className="p-6 bg-[#a3e635]/10 border border-[#a3e635]/30 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#a3e635]/20 rounded-full animate-pulse">
                        <Activity className="w-6 h-6 text-[#a3e635]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white mb-0.5">All Systems Operational</h2>
                        <p className="text-xs text-[#a3e635]/80 font-mono">LAST_UPDATED: JUST_NOW</p>
                    </div>
                </div>
                <div className="text-2xl font-bold text-[#a3e635] font-display">100%</div>
            </div>

            <SupportSection title="Core Services">
                <div className="bg-zinc-900/40 border border-white/5 rounded-sm">
                    <StatusRow service="API Gateway" status="operational" uptime="99.99%" />
                    <StatusRow service="Database Clusters" status="operational" uptime="99.95%" />
                    <StatusRow service="Authentication (Auth0)" status="operational" uptime="100.00%" />
                    <StatusRow service="File Storage (CDN)" status="operational" uptime="99.98%" />
                    <StatusRow service="Payment Processing (Stripe)" status="operational" uptime="100.00%" />
                    <StatusRow service="Real-time Notifications" status="degraded" uptime="98.50%" />
                    <StatusRow service="Email Delivery" status="operational" uptime="99.99%" />
                </div>
            </SupportSection>

            <SupportSection title="Scheduled Maintenance">
                <div className="p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm opacity-60">
                    <h4 className="text-sm font-bold text-white mb-1">Database Optimization</h4>
                    <p className="text-xs text-zinc-400 mb-2">Scheduled for Feb 28, 2026 - 02:00 AM UTC</p>
                    <div className="text-[10px] text-zinc-500 font-mono px-2 py-1 bg-zinc-800 rounded-sm w-fit">EXPECTED_DOWNTIME: 15_MINS</div>
                </div>
                <p className="text-xs text-zinc-500 text-center mt-4">For real-time updates, follow <span className="text-zinc-300 hover:text-white cursor-pointer underline">@creonity_status</span> on Twitter.</p>
            </SupportSection>
        </div>
    );
}
