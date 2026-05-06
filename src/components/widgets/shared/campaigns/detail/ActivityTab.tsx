"use client";

import { CAMPAIGNS_LIST } from "@/lib/brand-data";

export function ActivityTab({ campaignId }: { campaignId: string }) {
    const campaign = CAMPAIGNS_LIST.find(c => c.id === campaignId);

    const activities = [
        { time: "2026-02-15 10:42", action: "Creator applied", detail: "Tech_Nomad applied to campaign" },
        { time: "2026-02-14 14:20", action: "Creator accepted", detail: "Sarah_Vfx accepted invitation" },
        { time: "2026-02-12 09:15", action: "Content submitted", detail: "Tech_Nomad submitted draft v1" },
        { time: "2026-02-10 16:00", action: "Payment made", detail: "Sarah_Vfx milestone 1 — $2,500" },
        { time: "2026-02-01 08:00", action: "Campaign edited", detail: "Budget updated to $20,000" },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Activity Log</h2>
            <div className="border-l-2 border-zinc-800 pl-4 space-y-4">
                {activities.map((a, i) => (
                    <div key={i} className="relative -left-4">
                        <div className="absolute left-0 w-2 h-2 rounded-full bg-[#a3e635] mt-1.5" />
                        <div className="pl-4">
                            <div className="text-[10px] font-mono text-zinc-500">{a.time}</div>
                            <div className="text-xs font-bold text-white">{a.action}</div>
                            <div className="text-[10px] font-mono text-zinc-400">{a.detail}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
