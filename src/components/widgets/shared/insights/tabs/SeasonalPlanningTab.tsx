"use client";

import { DashboardWidgetShell } from "@/components/widgets/shared/DashboardWidgetShell";
import { INSIGHTS_SEASONAL } from "@/lib/brand-data";
import { CalendarIcon, Gift, Clock } from "lucide-react";

export function SeasonalPlanningTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-lg font-bold text-white uppercase tracking-wider font-display mb-1">Seasonal Planning</h1>
                <p className="text-xs text-zinc-500">Upcoming holidays/events, best times to launch campaigns, seasonal content ideas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardWidgetShell
                    title="Upcoming Events"
                    subtitle="Key dates for brand campaigns"
                    icon={CalendarIcon}
                >
                    <div className="p-4 space-y-4">
                        {INSIGHTS_SEASONAL.map((item) => (
                            <div key={item.event} className="flex items-start gap-4 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                                <div className="shrink-0 w-12 text-center">
                                    <span className="text-[10px] font-mono font-bold text-[#a3e635] block">{item.date}</span>
                                    <span className="text-[9px] text-zinc-600 block">{item.event}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] text-zinc-300">{item.tip}</p>
                                    <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Best launch: {item.bestLaunch}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DashboardWidgetShell>

                <DashboardWidgetShell
                    title="Best Times to Launch"
                    subtitle="Peak engagement windows"
                    icon={Clock}
                >
                    <div className="p-4 space-y-4">
                        <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <span className="text-xs font-medium text-white">Tuesday–Thursday</span>
                            <p className="text-[10px] text-zinc-500 mt-1">Highest creator availability and audience engagement mid-week.</p>
                        </div>
                        <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <span className="text-xs font-medium text-white">2–3 weeks before event</span>
                            <p className="text-[10px] text-zinc-500 mt-1">Optimal lead time for holiday/seasonal campaigns.</p>
                        </div>
                        <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                            <span className="text-xs font-medium text-white">Avoid Dec 20–Jan 5</span>
                            <p className="text-[10px] text-zinc-500 mt-1">Creator availability drops during holidays.</p>
                        </div>
                    </div>
                </DashboardWidgetShell>
            </div>

            <DashboardWidgetShell
                title="Seasonal Content Ideas"
                subtitle="Quick inspiration for campaign themes"
                icon={Gift}
            >
                <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { tag: 'Valentine\'s', idea: 'Gift guides, unboxing, couples content' },
                        { tag: 'Spring', idea: 'Fresh starts, seasonal themes, outdoor' },
                        { tag: 'Mother\'s Day', idea: 'Family, gratitude, gift roundups' },
                        { tag: 'Summer', idea: 'Travel, lifestyle, product-in-use' },
                    ].map((item) => (
                        <div key={item.tag} className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:border-zinc-700 transition-colors">
                            <span className="text-[10px] font-mono font-bold text-[#a3e635]">{item.tag}</span>
                            <p className="text-[9px] text-zinc-500 mt-1">{item.idea}</p>
                        </div>
                    ))}
                </div>
            </DashboardWidgetShell>
        </div>
    );
}
