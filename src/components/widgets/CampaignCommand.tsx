import { Megaphone, TrendingUp, Users, Target } from "lucide-react";

export function CampaignCommand() {
    return (
        <div className="h-full flex flex-col p-6 bg-black/20">
            {/* KPI Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <KPICard label="Total_Reach" value="2.4M" change="+12%" icon={Users} />
                <KPICard label="Avg_Engagement" value="8.5%" change="+2.1%" icon={TrendingUp} />
            </div>

            {/* Active Campaigns List */}
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active_Deployments</div>
                    <div className="text-[10px] font-mono text-[#a3e635]">3_RUNNING</div>
                </div>

                <CampaignRow name="Summer_Launch_v2" status="LIVE" budget="$50k" spent="65%" />
                <CampaignRow name="Influencer_Seeding" status="LIVE" budget="$12k" spent="32%" />
                <CampaignRow name="Retargeting_Q3" status="PAUSED" budget="$25k" spent="10%" />
            </div>

            {/* Mini Chart Placeholder */}
            <div className="mt-6 h-24 border border-zinc-800 bg-zinc-900/50 relative overflow-hidden flex items-end justify-between px-2 pb-0 opacity-50">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                    <div key={i} className="w-1.5 bg-zinc-600" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}

function KPICard({ label, value, change, icon: Icon }: any) {
    return (
        <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-sm">
            <div className="flex justify-between items-start mb-2">
                <Icon className="w-4 h-4 text-zinc-500" />
                <span className="text-[10px] font-mono text-[#a3e635]">{change}</span>
            </div>
            <div className="text-2xl font-display font-bold text-white tracking-tight">{value}</div>
            <div className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">{label}</div>
        </div>
    )
}

function CampaignRow({ name, status, budget, spent }: any) {
    return (
        <div className="flex items-center justify-between p-3 bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${status === "LIVE" ? "bg-[#a3e635] animate-pulse" : "bg-zinc-600"}`} />
                <div>
                    <div className="text-xs font-bold text-white">{name}</div>
                    <div className="text-[10px] font-mono text-zinc-500">Budget: {budget}</div>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <div className="text-[10px] font-mono text-zinc-400">{spent}</div>
                <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-white/20" style={{ width: spent }} />
                </div>
            </div>
        </div>
    )
}
